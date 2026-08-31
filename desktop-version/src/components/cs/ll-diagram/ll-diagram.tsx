import { FC, ReactNode } from "react";

/**
  * author: { @Override } : 20260806 @ 14:24
**/

const STYLE_NODE = "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-button-border font-mono text-sm";

type LLDiagramProps = {
  values?: number[] | string[];
  className?: string;
};

export const LLDiagram: FC<LLDiagramProps> = ({ values = [], className }) => {

  const processNode = (v: number | string): ReactNode => {
    if (v === 0) {
      return <div></div>;
    }
    return <div className="h-1 w-10 bg-black"></div>;
  }


  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      {values.map((v, i) => (
        <div className="flex items-center gap-2">
          {processNode(i)}
          <div key={i} className={STYLE_NODE}>{v}</div>
        </div>
      ))}
    </div>
  );
}
