import React, { FC } from "react";
import styles from "./Header.module.css";
import { useAppContext } from "../../context/app";
import MonthSelector from "../MonthSelector";

const Header: FC = () => {
  const { activeDate } = useAppContext();
  return (
    <div className={styles.header}>
      <div className={styles.monthSelectorContainer}>
        <MonthSelector />
      </div>
      <div className={styles.dateStringContainer}>
        <h3>
          {activeDate.toLocaleString("default", { month: "long" })}{" "}
          {activeDate.getFullYear()}
        </h3>
      </div>
    </div>
  );
};

export default Header;
