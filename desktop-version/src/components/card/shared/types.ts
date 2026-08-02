import { ReactNode } from "react";

type CollectionType = "title" | "style" | string;

export type SharedType = {
  type?: CollectionType;
  children?: ReactNode;
};


