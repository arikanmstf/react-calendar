import React, { CSSProperties, FC, LegacyRef, memo } from "react";
import styles from "./MonthView.module.css";
import Day from "../Day";
import MonthViewProvider from "./MonthViewProvider";
import useDays from "../../hooks/useDays";

type Props = {
  referenceMonth: number;
  referenceYear: number;
  style?: CSSProperties;
  reference?: LegacyRef<any>;
};

const MonthView: FC<Props> = ({
  referenceMonth,
  referenceYear,
  style,
  reference,
}) => {
  const referenceDate = new Date(referenceYear, referenceMonth, 1);
  const days = useDays({ date: referenceDate });

  return (
    <MonthViewProvider referenceDate={referenceDate}>
      <div
        ref={reference}
        style={style}
        role="grid"
        className={styles.monthView}
      >
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
