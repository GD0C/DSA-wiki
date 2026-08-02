# Theming (Tailwind v4 + Tauri v2)

Light/dark mode for this app: how it's built, why each piece exists, and how to
redo it from scratch in another project.

Stack: Tailwind v4.3.3, React 19, Vite 7, Tauri v2, TypeScript.

---

## Files involved

| File | Role |
|---|---|
| `src/index.css` | design tokens — the three-layer CSS setup |
| `src/theme/theme-provider.tsx` | context, hook, all runtime logic |
| `src/theme/index.ts` | barrel export |
| `src/main.tsx` | imports `index.css`, wraps app in `<ThemeProvider>` |
| `index.html` | inline no-flash script in `<head>` |
| `src/App.tsx` | toggle button + light/dark/system dropdown |
| `src-tauri/capabilities/default.json` | grants `core:window:allow-set-theme` |

---

## 1. The CSS: three layers

`src/index.css`:

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

/* Layer 1 — raw values. One set per theme. Plain names, no --color- prefix. */
:root {
  --brand: rgba(255, 255, 255, 0.5);
  --border: rgba(0, 0, 0, 0.5);
}

.dark {
  --brand: rgba(0, 0, 0, 0.5);
  --border: rgba(255, 255, 255, 0.5);
}

/* Layer 2 — bridge. This is what generates bg-brand, text-brand, border-border… */
@theme inline {
  --color-brand: var(--brand);
  --color-border: var(--border);
}
```

Layer 3 is the compiler output:

```css
.bg-brand { background-color: var(--brand); }
```

### Why it works

The utility resolves `var(--brand)` **at paint time**, not build time. Add `.dark`
to `<html>` and `--brand` re-resolves, so every `bg-brand` on the page changes at
once. No re-render, no JavaScript — the CSS cascade does it.

### Two rules that are easy to get wrong

**`@theme` is required.** Defining `--color-brand` in `:root` alone does *not*
create `bg-brand`. Tailwind v4 only scans `@theme` blocks when generating
utilities.

**`inline` is load-bearing.** Without it, `@theme` copies the value at build time
and freezes it — the `.dark` override gets ignored and nothing switches. Use
`inline` whenever a token's value points at another variable.

**Two naming layers, on purpose.** `--brand` is your value; `--color-brand` is
Tailwind's handle on it. Collapse them into one name and Tailwind can't tell
tokens apart from ordinary CSS variables.

### The `dark:` variant

```css
@custom-variant dark (&:where(.dark, .dark *));
```

By default in v4, `dark:` follows the OS via `prefers-color-scheme` and can't be
toggled. This line rebinds it to a `.dark` class on an ancestor, which is what
makes a manual toggle possible.

With semantic tokens you rarely need `dark:` — `bg-brand` already handles both
themes. It's there for one-off cases.

### Adding a token later

Three lines: one in `:root`, one in `.dark`, one in `@theme inline`. Then
`bg-<name>`, `text-<name>`, `border-<name>` all exist automatically.

Namespaces beyond color: `--font-*`, `--spacing-*`, `--radius-*`, `--text-*`.

---

## 2. React: one line that matters

`src/theme/theme-provider.tsx`:

```ts
document.documentElement.classList.toggle('dark', next === 'dark');
```

That is the entire connection between React and the theme. Everything else in
that file is bookkeeping around it.

### Two theme values

```ts
export type Theme = 'light' | 'dark' | 'system';         // what the user picked
export type ResolvedTheme = 'light' | 'dark';            // what's actually showing
```

They differ only when `theme === 'system'`. Both are needed:

- **Persist `theme`.** Storing `"dark"` when the user meant "follow my OS" is wrong.
- **Render from `resolvedTheme`.** A toggle button needs to know what's on screen now.

### The effect

```ts
useEffect(() => {
  const apply = () => {
    const next = resolve(theme);
    setResolvedTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  apply();
  localStorage.setItem(STORAGE_KEY, theme);
  syncNativeChrome(theme);

  // Only 'system' needs to react to the OS flipping while the app is open.
  if (theme !== 'system') return;

  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener('change', apply);
  return () => query.removeEventListener('change', apply);
}, [theme]);
```

The `matchMedia` listener only attaches under `system` — under `light` or `dark`
the OS setting is irrelevant.

The returned function is cleanup: React runs it before the next effect and on
unmount. Skip it and you leak a listener on every theme change. Roughly: effect
body = constructor, returned function = destructor, React manages the lifetime.

### Context

`useTheme()` throws when called outside the provider instead of returning `null`
— a loud error at the call site beats an `undefined` three components deep.

The context value is wrapped in `useMemo`. Without it the provider hands down a
fresh object every render and every consumer re-renders.

---

## 3. Flash of wrong theme

Load order on launch:

```
HTML parses → first paint → JS bundle loads → React mounts → effect runs
              ^^^^^^^^^^^                                    ^^^^^^^^^^^
              white here                                     theme applied here
```

Those two points are far apart, so without intervention every launch flashes
white. Very obvious on a desktop app.

Fix — inline script in `index.html`, inside `<head>`, before the module script:

```html
<script>
  (function () {
    try {
      var stored = localStorage.getItem("theme");
      var theme = stored === "light" || stored === "dark" ? stored : "system";
      var dark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
      document.documentElement.classList.toggle("dark", dark);
    } catch (e) {
      /* localStorage unavailable — fall through to light */
    }
  })();
</script>
```

Must be inline (no `src`), not `type="module"`, not `defer`. All three make it
async, which defeats the point — it has to block.

It duplicates a few lines of provider logic on purpose. There's no way to share
code that must run before the bundle exists. **Keep both in sync.**

---

## 4. Tauri: native window chrome

The webview only controls web content. Titlebar, traffic lights, scrollbars, and
native context menus are drawn by the OS and stay light unless told otherwise —
a dark app with a bright titlebar looks broken.

```ts
import { getCurrentWindow } from '@tauri-apps/api/window';

const syncNativeChrome = (theme: Theme) => {
  try {
    getCurrentWindow()
      .setTheme(theme === 'system' ? null : theme)
      .catch(() => { });
  } catch {
    // not running inside Tauri
  }
};
```

`setTheme(null)` means "follow the OS" — that's why `system` maps to `null`
rather than a resolved value.

The try/catch exists because `getCurrentWindow()` throws when there's no Tauri
runtime, e.g. opening `localhost:1420` in a browser. The app still works there,
just without native chrome sync.

### The permission

`core:default` includes `allow-theme` (read) but **not** `allow-set-theme`
(write). Verified in `src-tauri/gen/schemas/acl-manifests.json`.

`src-tauri/capabilities/default.json`:

```json
"permissions": [
  "core:default",
  "core:window:allow-set-theme",
  "opener:default"
]
```

Tauri v2 denies by default. A missing permission surfaces as a **rejected promise
in the devtools console**, not a compile error. When a Tauri API silently does
nothing, check capabilities first.

This file is read at **compile** time — changes need a Rust rebuild, not a page
refresh.

### Static alternative

To lock native chrome without any JS, set it in `src-tauri/tauri.conf.json`
inside the window object:

```json
"theme": "Dark"
```

Omit or `null` to follow the OS.

---

## Redoing this from scratch

1. `npm install tailwindcss @tailwindcss/vite`
2. `vite.config.ts` — import `tailwindcss from "@tailwindcss/vite"`, add
   `tailwindcss()` to the `plugins` array
3. `src/index.css` — `@import "tailwindcss";` + `@custom-variant` + the three layers
4. `src/main.tsx` — `import "./index.css";` **before** any other stylesheet, so
   Tailwind's preflight reset doesn't override your own rules
5. **Smoke-test the CSS alone**: hardcode `class="dark"` on `<html>` in
   `index.html`, confirm colors flip, remove it. Do this *before* writing any
   React — a broken toggle and broken CSS look identical from the outside.
6. `useState` + `useEffect` toggling the class. Verify.
7. Add `localStorage`. Restart the app, verify it sticks.
8. Add the no-flash script.
9. Extract to Context so any component can read the theme.
10. Add `setTheme()` for native chrome + the capability entry.
11. Add `"system"` as a third state.

Each step is independently testable. Don't write all eleven then debug.

---

## Gotchas, condensed

- Utilities come from `@theme`, not from `:root`.
- `@theme inline` is mandatory when a token points at another variable.
- Keep raw names (`--brand`) and Tailwind names (`--color-brand`) separate.
- Load `index.css` before `App.css` — preflight order matters.
- The no-flash script must block; inline only.
- Tauri permission failures are console warnings, not build errors.
- `capabilities/*.json` and `tauri.conf.json` are compile-time; rebuild after editing.

---

## Known issues in this codebase

- `src/components/card/base/base-card.tsx` — the `styles` prop *replaces* the
  defaults rather than merging. `<BaseCard styles="mt-4">` loses padding,
  background, and rounding. Wants `` `${class_styles} ${styles}` ``, or
  `tailwind-merge` to resolve conflicts like `p-5` vs `p-2` properly.
- `src/App.tsx` — `console.log(greetMsg)` inside `greet()` logs the previous
  value; `setState` hasn't applied yet.
- `--border` is defined but unused.
- `src/App.css` still has `.row` / `.logo` / `.container` fighting preflight.
  `.container` also collides with Tailwind's own `container` utility. Port those
  styles to utilities and delete the file.

---

## Reference

- <https://tailwindcss.com/docs/theme> — `@theme`, namespaces, `inline`
- <https://tailwindcss.com/docs/dark-mode> — `@custom-variant`, no-flash script
- <https://tailwindcss.com/docs/colors> — built-in palettes
- <https://v2.tauri.app/reference/javascript/api/namespacewindow/> — `setTheme`, `theme`
- <https://v2.tauri.app/security/capabilities/> — permission model
