import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  onClick?: MouseEventHandler;
  children: ReactNode;
  icon?: boolean;
  disabled?: boolean;
  className?: string;
  accent?: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
  role?: "submit";
};
