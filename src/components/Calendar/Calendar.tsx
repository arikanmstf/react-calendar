import React, { FC } from "react";
import MonthView from "../MonthView";
import "../../ui/ui.css";
import Header from "../Header/Header";
import useDays from "../../hooks/useDays";
import { useAppContext } from "../../context/app";
import styles from "./Calendar.module.css";

const Calendar: FC = () => {
  const { activeDate } = useAppContext();
  const days = useDays();
  const nextMonth = new Date(activeDate);
  nextMonth.setMonth(activeDate.getMonth() + 1);

  const previousMonth = new Date(activeDate);
  previousMonth.setMonth(activeDate.getMonth() - 1);

  const daysOfNextMonth = useDays({ date: nextMonth });
  const daysOfPreviousMonth = useDays({ date: previousMonth });

  return (
    <div className={styles.calendar}>
      <Header />
      <div className={styles.monthContainer}>
        <MonthView month="PREVIOUS" days={daysOfPreviousMonth} />
        <MonthView month="CURRENT" days={days} />
        <MonthView month="NEXT" days={daysOfNextMonth} />
      </div>
    </div>
  );
};

export default Calendar;
