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

export type IconProps = {
  name: "chevron-left" | "chevron-right" | "bin" | "calendar";
  width?: number;
  height?: number;
};
