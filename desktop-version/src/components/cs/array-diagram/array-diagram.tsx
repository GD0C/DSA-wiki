import { ReactNode, useState, KeyboardEvent } from "react";

/**
  * author: { @Override } : 20260806 @ 13:00
**/

const CELL_PX = 40;
const GAP_PX = 4;

type ArrayDiagramBase<T> = {
  values?: T[];
  size?: number;
  showIndices?: boolean;
  highlight?: number[];
};

type ArrayDiagramProps<T> =
  | (ArrayDiagramBase<T> & { type?: "basic" })
  | (ArrayDiagramBase<T> & {
    type: "advanced";
    renderDetail: (value: T | undefined, index: number) => ReactNode; // <div>hello</div>
    defaultSelected?: number;
  });



export const ArrayDiagram = <T = number>(props: ArrayDiagramProps<T>) => {
  const { values, size, showIndices = true, highlight } = props;
  const length = values?.length ?? size ?? 0;

  const [selected, setSelected] = useState<number | null>(props.type === "advanced" ? props.defaultSelected ?? null : null);

  const cell = (i: number) => {
    const filled = values !== undefined && i < values.length;
    const active = selected === i;
    const hot = highlight?.includes(i);

    const base = [
      "flex items-center justify-center font-mono text-sm transition-transform duration-200",
      "w-10 h-10",
      filled ? "border border-button-border" : "border border-dashed border-button-border/50",
      hot ? "bg-button-border/20" : "",
      active ? "border-2 -translate-y-0.5" : "",
    ].join(" ");

    const content = filled ? String(values[i]) : "";

    if (props.type !== "advanced") {
      return <div key={i} className={base}>{content}</div>;
    }

    const detail = props.renderDetail(values?.[i], i);
    if (detail === null) return <div key={i} className={base}>{content}</div>;

    return (
      <button
        key={i}
        type="button"
        aria-expanded={active}
        aria-controls="array-detail"
        className={`${base} hover:cursor-pointer hover:-translate-y-0.5`}
        onClick={() => setSelected(active ? null : i)}
      >
        {content}
      </button>
    );
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (props.type !== "advanced" || selected === null) return;
    if (e.key === "Escape") return setSelected(null);
    if (e.key === "ArrowRight") setSelected(Math.min(selected + 1, length - 1));
    if (e.key === "ArrowLeft") setSelected(Math.max(selected - 1, 0));
  };

  const indices = Array.from({ length }, (_, i) => i);

  return (

    <div className="flex flex-col" onKeyDown={onKeyDown}>
      <div className="flex gap-1" role="list">
        {indices.map(cell)}
      </div>

      {showIndices && (
        <div className="flex gap-1" aria-hidden>
          {indices.map((i) => (
            <span key={i} className="w-10 text-center text-xs opacity-60">{i}</span>
          ))}
        </div>
      )}

      {props.type === "advanced" && selected !== null && (
        <div className="mt-1">
          <div
            className="h-2 w-2 rotate-45 border-l border-t border-button-border bg-brand"
            style={{ marginLeft: selected * (CELL_PX + GAP_PX) + CELL_PX / 2 - 4 }}
          />
          <div
            id="array-detail"
            className="-mt-1 rounded-md border border-button-border bg-brand p-3"
          >
            {props.renderDetail(values?.[selected], selected)}
          </div>
        </div>
      )}
    </div>
  );
}
