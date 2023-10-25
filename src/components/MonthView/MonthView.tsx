import React, { FC, memo } from "react";
import styles from "./MonthView.module.css";
import Day from "../Day";
import MonthViewProvider from "./MonthViewProvider";
import useDays from "../../hooks/useDays";

type Props = {
  referenceMonth: number;
  referenceYear: number;
};

const MonthView: FC<Props> = ({ referenceMonth, referenceYear }) => {
  const referenceDate = new Date(referenceYear, referenceMonth, 1);
  const days = useDays({ date: referenceDate });

  return (
    <MonthViewProvider referenceDate={referenceDate}>
      <div role="grid" className={styles.month}>
        <div className={styles.weekContainer}>
          {days.map((week, i) => (
            <div key={i} role="row" className={styles.week}>
              {week.map((day, j) => (
                <Day showWeekDay={i === 0} key={j} date={day} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </MonthViewProvider>
  );
};

export default memo(MonthView);
