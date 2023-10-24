import { FC, ReactNode } from "react";
import styles from "./week.module.css";

type Props = {
  children: ReactNode;
};

const Week: FC<Props> = ({ children }) => {
  return (
    <div role="row" className={styles.week}>
      {children}
    </div>
  );
};

export default Week;
