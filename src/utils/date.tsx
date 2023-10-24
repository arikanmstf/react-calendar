export const getStartDayOfMonthCalendar = (date = new Date()) => {
  const startDayOfTheMonth = new Date();
  startDayOfTheMonth.setFullYear(date.getFullYear(), date.getMonth(), 1);
  const weekDayIndex = startDayOfTheMonth.getDay();
  startDayOfTheMonth.setDate(startDayOfTheMonth.getDate() - weekDayIndex);
  return startDayOfTheMonth;
};
