import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { AccordionCard, BaseCard } from "./components";
import { useTheme } from "./theme";
import type { Theme } from "./theme";
import "./App.css";

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
officia deserunt mollit anim id est laborum.`;

const accordionData = Array.from({ length: 4 }, (_, i) => ({
  title: `Accordion ${i + 1}`,
  children: <p>{LOREM}</p>,
}));

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  async function greet() {
    const msg = await invoke<string>("greet", { name });
    setGreetMsg(msg);
  }


  // TODO: CLEAN THIS S*** UP
  return (
    <main className="p-4">
      <div className="flex flex-col gap-4">
        <AccordionCard data={accordionData} />

        <BaseCard>
          <h1 className="text-5xl font-bold text-red-500">Welcome to Tauri + React</h1>
        </BaseCard>
      </div>

      <div className="row">
        <button type="button" onClick={toggleTheme}>
          Toggle theme (now: {resolvedTheme})
        </button>
        <select value={theme} onChange={(e) => setTheme(e.currentTarget.value as Theme)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>


      <div className="row">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main >
  );
}

export default App;
