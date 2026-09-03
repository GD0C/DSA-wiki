import { ReactNode, useState, KeyboardEvent } from "react";

/**
  * author: { @Override } : 20260806 @ 13:00
**/

type StackDiagramBase<T> = {
  values?: T[];
  size?: number;
  showIndices?: boolean; // This is for when you are implementing the stack with an array
  showTop?: boolean;
  highlight?: number[];
};

type StackDiagramProps<T> =
  | (StackDiagramBase<T> & { type?: "basic" })
  | (StackDiagramBase<T> & {
    type: "advanced";
    renderDetail: (value: T | undefined, index: number) => ReactNode; // <div>hello</div>
    defaultSelected?: number;
  });

export const StackDiagram = <T = number>(props: StackDiagramProps<T>) => {
  const { values, size, showIndices = false, showTop = true, highlight } = props;

  // A stack drawn over an array: `size` is the capacity, `values.length` is how
  // much of it is filled. Any leftover slots are drawn above the top as empties.
  const filled = values?.length ?? 0;
  const capacity = Math.max(size ?? 0, filled);

  const [selected, setSelected] = useState<number | null>(
    props.type === "advanced" ? props.defaultSelected ?? null : null,
  );

  const row = (i: number) => {
    const isFilled = i < filled;
    const active = selected === i;
    const hot = highlight?.includes(i);
    const isTop = isFilled && i === filled - 1;

    const base = [
      "flex items-center justify-center font-mono text-sm transition-transform duration-200",
      "w-10 h-10",
      isFilled ? "border border-button-border" : "border border-dashed border-button-border/50",
      hot ? "bg-button-border/20" : "",
      active ? "border-2 translate-x-1" : "",
    ].join(" ");

    const content = isFilled ? String(values![i]) : "";

    const detail = props.type === "advanced" ? props.renderDetail(values?.[i], i) : null;
    const clickable = props.type === "advanced" && detail !== null;

    const cell = clickable ? (
      <button
        type="button"
        aria-expanded={active}
        aria-controls="stack-detail"
        className={`${base} hover:cursor-pointer hover:translate-x-1`}
        onClick={() => setSelected(active ? null : i)}
      >
        {content}
      </button>
    ) : (
      <div className={base}>{content}</div>
    );

    return (
      <div key={i} className="flex items-center gap-2" role="listitem">
        {showIndices && (
          <span className="w-6 text-right text-xs opacity-60" aria-hidden>{i}</span>
        )}
        {cell}
        {showTop && isTop && (
          <span className="font-mono text-xs opacity-70">&larr; top</span>
        )}
      </div>
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (props.type !== "advanced" || selected === null) return;
    if (e.key === "Escape") return setSelected(null);
    // The stack is drawn bottom-up, so "up" is a higher index.
    if (e.key === "ArrowUp") setSelected(Math.min(selected + 1, capacity - 1));
    if (e.key === "ArrowDown") setSelected(Math.max(selected - 1, 0));
  };

  // Top of the stack renders first so the highest index sits at the top.
  const indices = Array.from({ length: capacity }, (_, i) => capacity - 1 - i);

  return (
    <div className="flex flex-col" onKeyDown={onKeyDown}>
      <div className="flex flex-col gap-1" role="list">
        {indices.map(row)}
      </div>

      {props.type === "advanced" && selected !== null && (
        <div className="mt-1">
          <div
            className="ml-4 h-2 w-2 rotate-45 border-l border-t border-button-border bg-brand"
            style={showIndices ? { marginLeft: 40 } : undefined}
          />
          <div
            id="stack-detail"
            className="-mt-1 rounded-md border border-button-border bg-brand p-3"
          >
            {props.renderDetail(values?.[selected], selected)}
          </div>
        </div>
      )}
    </div>
  );
}
