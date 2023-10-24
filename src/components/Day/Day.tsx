import { FC, useMemo, useState } from "react";
import styles from "./Day.module.css";
import { useMonthViewContext } from "../MonthView/MonthViewProvider";

type Props = {
  date: Date;
};

const Day: FC<Props> = ({ date }) => {
  const [isToday, setIsToday] = useState<boolean>();
  const [isAnotherMonth, setIsAnotherMonth] = useState<boolean>();
  const { referenceDate } = useMonthViewContext();
  const dayOfTheMonth = date.getDate();
  useMemo(() => {
    setIsToday(new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0));
    setIsAnotherMonth(referenceDate.getMonth() !== date.getMonth());
  }, [date, referenceDate]);

  return (
    <div className={styles.day}>
      <span
        className={`${styles.number} ${isToday ? styles.today : ""} ${
          isAnotherMonth ? styles.inactive : ""
        }`}
      >
        {dayOfTheMonth}
      </span>
      {dayOfTheMonth === 1 ? (
        <span
          className={`${styles.monthName} ${
            isAnotherMonth ? styles.inactive : ""
          }`}
        >
          {date.toLocaleString("default", { month: "short" })}
        </span>
      ) : null}
    </div>
  );
};

export default Day;
