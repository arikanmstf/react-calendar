import { FC, ReactNode } from "react";
import styles from "./Month.module.css";

type Props = {
  children: ReactNode;
};

const Month: FC<Props> = ({ children }) => {
  return (
    <div role="grid" className={styles.month}>
      {children}
    </div>
  );
};

export default Month;
