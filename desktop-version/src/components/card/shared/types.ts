import { ReactNode } from "react";
/**
  * Author: { @Override } - 20260802 : @1340
**/

export type CardTypes =
  | "standard"
  | "accordion"
  | "accordion_row"
  | "accordion_array"
  | "image";

export type CardType = (typeof CardTypes)[number];
export type GridSize = 1 | 2 | 3 | 4;

export type SharedType = {
  type?: CardType;
  children?: ReactNode;
  size?: GridSize;
};


