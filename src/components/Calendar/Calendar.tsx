import React, { FC } from "react";
import "../../ui/ui.css";
import Header from "../Header/Header";
import useAppContext from "../../context/useAppContext";
import styles from "./Calendar.module.css";
import MonthViewWithTransition from "../MonthView/MonthViewWithTransition";

const Calendar: FC = () => {
  const { activeDate } = useAppContext();
  const nextMonth = new Date(activeDate);
  nextMonth.setMonth(activeDate.getMonth() + 1);

  const previousMonth = new Date(activeDate);
  previousMonth.setMonth(activeDate.getMonth() - 1);

  return (
    <div className={styles.calendar}>
      <Header />
      <MonthViewWithTransition />
    </div>
  );
};

export default Calendar;
