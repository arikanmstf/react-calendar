import React, { FC, FunctionComponent, SVGProps } from "react";
import { ReactComponent as ChevronLeft } from "./chevron-left.svg";
import { ReactComponent as ChevronRight } from "./chevron-right.svg";
import { ReactComponent as Bin } from "./bin.svg";
import { ReactComponent as Calendar } from "./calendar.svg";
import { IconProps } from "../types";

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
    default:
      break;
  }
  return <Component width={width || 24} height={height || 24} />;
};

export default Icon;
