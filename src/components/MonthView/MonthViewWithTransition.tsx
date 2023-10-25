import React, { FC } from "react";
import MonthView from "./MonthView";
import useAppContext from "../../context/useAppContext";
import styles from "./MonthView.module.css";

const MonthViewWithTransition: FC = () => {
  const { monthsToShow } = useAppContext();
  return (
    <div className={styles.monthViewWithTransition}>
      {monthsToShow.map((referenceDate) => (
        <MonthView
          key={referenceDate.valueOf()}
          referenceMonth={referenceDate.getMonth()}
          referenceYear={referenceDate.getFullYear()}
        />
      ))}
    </div>
  );
};

export default MonthViewWithTransition;
