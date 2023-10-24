import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const IconRoot: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default IconRoot;
