import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./MonthView.module.css";
import Day from "../Day";
import { useAppContext } from "../../context/app";

type Props = {
  days: Date[][];
  month: "CURRENT" | "PREVIOUS" | "NEXT";
};

const MonthView: FC<Props> = ({ days = [], month }) => {
  const { activeMonth } = useAppContext();
  const [className, setClassName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref?.current?.className) {
      if (activeMonth === month) {
        ref.current.className = ref.current.className + " active";
      } else {
        ref.current.className = ref.current.className.replace(" active", "");
      }
    }
  }, [activeMonth, month]);

  useEffect(() => {
    if (month === "CURRENT") {
      setClassName(styles.currentMonth);
    } else if (month === "PREVIOUS") {
      setClassName(styles.previousMonth);
    } else if (month === "NEXT") {
      setClassName(styles.nextMonth);
    }
  }, [month]);

  return (
    <div ref={ref} role="grid" className={`${styles.month} ${className}`}>
      <div className={styles.weekContainer}>
        {days.map((week, i) => (
          <div key={i} role="row" className={styles.week}>
            {week.map((day, i) => (
              <Day key={i} date={day} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthView;
