import { FC, useMemo, useState } from "react";
import styles from "./Day.module.css";
import { useMonthViewContext } from "../MonthView/MonthViewProvider";
import { Popover } from "react-tiny-popover";
import { useAppContext } from "../../context/app";
import CalendarEventForm from "../CalendarEventForm/CalendarEventForm";
import { getEventsOfTheDate, getUniqueCellId } from "../../utils/date";
import { Indicator } from "../../ui";

type Props = {
  date: Date;
  showWeekDay?: boolean;
};

const Day: FC<Props> = ({ date, showWeekDay }) => {
  const [isToday, setIsToday] = useState<boolean>();
  const [isAnotherMonth, setIsAnotherMonth] = useState<boolean>();
  const { referenceDate } = useMonthViewContext();
  const { openPopoverIndex, updateOpenPopoverIndex, calendarEvents } =
    useAppContext();
  const dayOfTheMonth = date.getDate();
  useMemo(() => {
    setIsToday(new Date().setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0));
    setIsAnotherMonth(referenceDate.getMonth() !== date.getMonth());
  }, [date, referenceDate]);
  const popoverIndex = getUniqueCellId(date, referenceDate);
  const eventsOnThisDay = getEventsOfTheDate(calendarEvents, date);

  const onClick = () => {
    updateOpenPopoverIndex(popoverIndex);
  };
  const isSelected = openPopoverIndex === popoverIndex;

  return (
    <Popover
      isOpen={isSelected}
      positions={["right", "left", "top", "bottom"]}
      content={<CalendarEventForm date={date} />}
      align="start"
      padding={10}
    >
      <div
        role="button"
        onClick={onClick}
        className={`${styles.day} ${isSelected ? styles.selected : ""}`}
      >
        {showWeekDay ? (
          <div className={styles.header}>
            <b>{date.toLocaleString("default", { weekday: "short" })}</b>
          </div>
        ) : null}
        <div className={`${styles.header} ${styles.content}`}>
          <div
            className={`${styles.number} ${isToday ? styles.today : ""} ${
              isAnotherMonth ? styles.inactive : ""
            }`}
          >
            {dayOfTheMonth === 1 ? (
              <>
                <span>
                  {date.toLocaleString("default", { month: "short" })}
                </span>
                {", "}
              </>
            ) : null}
            <span>{dayOfTheMonth}</span>
          </div>
        </div>
        <div className={styles.footer}>
          {eventsOnThisDay.map((calendarEvent, i) => (
            <Indicator key={i} />
          ))}
        </div>
      </div>
    </Popover>
  );
};

export default Day;
