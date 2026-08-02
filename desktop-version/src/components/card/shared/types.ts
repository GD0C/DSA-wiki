import { ReactNode } from "react";

type CollectionType = "title" | "style" | string;

export styleCollection = <T extends CollectionType>(type: T) => {
  const data = {

  }
}

export type SharedType = {
  type?: CollectionType;
  children?: ReactNode;
};


