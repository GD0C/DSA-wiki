import { FC, ReactNode } from 'react';


type StackDiagramProps = {
  values?: number[] | string[];
}

export const StackDiagram: FC<StackDiagramProps> = ({ values = [] }) => {

  return (
    <div>
      {values.map((v, i) => (
        <div className="flex items-center gap-2">
          <div key={i} className="flex flex-col border h-10 w-10 shrink-0 items-center justify-center border-button-border font-mono text-sm">{v}</div>
        </div>
      ))}
    </div>
  )
}
