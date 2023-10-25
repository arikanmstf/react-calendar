import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: boolean;
  accent?: "POSITIVE" | "NEUTRAL" | "NEGATIVE";
};

export type IconProps = {
  name: "chevron-left" | "chevron-right" | "bin" | "calendar" | "cross" | "sun";
  width?: number;
  height?: number;
};
