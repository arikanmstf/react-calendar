import React, { FC } from "react";
import "../../ui/ui.css";
import Header from "../Header/Header";
import styles from "./Calendar.module.css";
import MonthViewWithTransition from "../MonthView/MonthViewWithTransition";

const Calendar: FC = () => {
  return (
    <div className={styles.calendar}>
      <Header />
      <MonthViewWithTransition />
    </div>
  );
};

export default Calendar;
