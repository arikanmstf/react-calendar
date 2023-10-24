import React, { FC, useMemo, useState } from "react";
import { getStartDayOfMonthCalendar } from "../../utils/date";
import Month from "../Month";
import Week from "../Week";
import Day from "../Day";
import { useAppContext } from "../../context/app";
import "../../ui/ui.css";
import Header from "../Header/Header";

const NR_OF_WEEKS_TO_SHOW = 6;
const DAYS_IN_A_WEEK = 7;

const Calendar: FC = () => {
  const [days, setDays] = useState<Date[][]>([[]]);
  const { activeDate } = useAppContext();

  useMemo(() => {
    const updatedDays = [];

    const startDate = getStartDayOfMonthCalendar(activeDate);
    for (let i = 0; i < NR_OF_WEEKS_TO_SHOW; i++) {
      const daysInTheWeek = [];
      const weekDate = new Date(startDate.getTime());
      weekDate.setDate(weekDate.getDate() + i * 7);

      for (let j = 0; j < DAYS_IN_A_WEEK; j++) {
        const day = new Date(weekDate.getTime());
        day.setDate(day.getDate() + j);
        daysInTheWeek.push(day);
      }
      updatedDays.push(daysInTheWeek);
    }
    setDays(updatedDays);
  }, [activeDate]);

  return (
    <div>
      <Header />
      <Month>
        {days.map((week) => (
          <Week>
            {week.map((day) => (
              <Day date={day}></Day>
            ))}
          </Week>
        ))}
      </Month>
    </div>
  );
};

export default Calendar;
