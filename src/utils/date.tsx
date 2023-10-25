import { CalendarEvent } from "../services/events";

export const getStartDayOfMonthCalendar = (date = new Date()) => {
  const startDayOfTheMonth = new Date();
  startDayOfTheMonth.setFullYear(date.getFullYear(), date.getMonth(), 1);
  const weekDayIndex = startDayOfTheMonth.getDay();
  startDayOfTheMonth.setDate(startDayOfTheMonth.getDate() - weekDayIndex);
  return startDayOfTheMonth;
};

export const getUniqueCellId = (date1: Date, date2: Date) => {
  return `${date1.valueOf()}_${date2.valueOf()}`;
};

export const getEventsOfTheDate = (
  allEvents: Record<number, CalendarEvent[]>,
  date: Date,
) => {
  return allEvents[date.valueOf()] || [];
};
