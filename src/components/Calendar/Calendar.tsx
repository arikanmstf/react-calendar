import React, { FC } from "react";
import "../../ui/ui.css";
import Header from "../Header/Header";
import { useAppContext } from "../../context/app";
import styles from "./Calendar.module.css";
import MonthViewWithSplide from "../MonthViewWithSplide";

const Calendar: FC = () => {
  const { activeDate } = useAppContext();
  const nextMonth = new Date(activeDate);
  nextMonth.setMonth(activeDate.getMonth() + 1);

  const previousMonth = new Date(activeDate);
  previousMonth.setMonth(activeDate.getMonth() - 1);

  return (
    <div className={styles.calendar}>
      <Header />
      <MonthViewWithSplide />
    </div>
  );
};

export default Calendar;
