import React, { FC, FunctionComponent, SVGProps } from "react";
import { ReactComponent as ChevronLeft } from "./chevron-left.svg";
import { ReactComponent as ChevronRight } from "./chevron-right.svg";
import { ReactComponent as Bin } from "./bin.svg";
import { ReactComponent as Calendar } from "./calendar.svg";
import { ReactComponent as Cross } from "./cross.svg";
import { ReactComponent as Sun } from "./sun.svg";

type IconProps = {
  name: "chevron-left" | "chevron-right" | "bin" | "calendar" | "cross" | "sun";
  width?: number;
  height?: number;
};

const Icon: FC<IconProps> = ({ width, height, name }) => {
  let Component: FunctionComponent<SVGProps<SVGSVGElement>> = React.Fragment;

  switch (name) {
    case "chevron-left":
      Component = ChevronLeft;
      break;
    case "chevron-right":
      Component = ChevronRight;
      break;
    case "bin":
      Component = Bin;
      break;
    case "calendar":
      Component = Calendar;
      break;
    case "cross":
      Component = Cross;
      break;
    case "sun":
      Component = Sun;
      break;
    default:
      break;
  }
  return (
    <Component
      width={width || 32}
      height={height || 32}
      style={{ color: "red" }}
    />
  );
};

export default Icon;
