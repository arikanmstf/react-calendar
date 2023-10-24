import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
  icon?: boolean;
};
