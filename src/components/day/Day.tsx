import { FC, useMemo, useState } from "react";
import styles from "./day.module.css";
import { useAppContext } from "../../context/app";

type Props = {
  date: Date;
};

const Day: FC<Props> = ({ date }) => {
  const [isToday, setIsToday] = useState<boolean>();
  const [isAnotherMonth, setIsAnotherMonth] = useState<boolean>();
  const { activeDate } = useAppContext();
  const dayOfTheMonth = date.getDate();
  useMemo(() => {
    setIsToday(new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0));
    setIsAnotherMonth(activeDate.getMonth() !== date.getMonth());
  }, [date, activeDate]);

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
        <span className={styles.monthName}>
          {date.toLocaleString("default", { month: "short" })}
        </span>
      ) : null}
    </div>
  );
};

export default Day;
