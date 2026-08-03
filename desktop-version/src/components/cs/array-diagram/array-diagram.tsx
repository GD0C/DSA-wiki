import { FC } from "react";

type ArrayDiagramType = "basic" | "advanced";

type ArrayType<T = number> = {
  size: number;
  values?: T[];
  type?: ArrayDiagramType;
  description?: () => string;
};

export const ArrayDiagram: FC<ArrayType> = ({ size, values, type = "basic" }) => {
  if (values.length === 0) {
    return (
      <div className="flex">
        {(Array.from({ length: size }, (_, i) => i)).map((i) => (
          <div className="w-1/2 h-full bg-gray-200 rounded-md">{i}</div>
        ))}
      </div>
    );
  }

  switch (type) {
    case "advanced":
      return (
        <div className="flex">
          {(Array.from({ length: size }, (_, i) => i)).map((i) => (
            <button className="border border-black w-10 h-10 flex align-center justify-center items-center">{values[i]}</button>
          ))}
        </div>
      );

    case "basic":
      return (
        <div className="flex">
          {(Array.from({ length: size }, (_, i) => i)).map((i) => (
            <div className="border border-black w-10 h-10 flex align-center justify-center items-center">{values[i]}</div>
          ))}
        </div>
      );
  }
}

