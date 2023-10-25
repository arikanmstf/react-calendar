import { useContext } from "react";
import { getEvents } from "../services/events";
import { AppContext, AppDispatchContext } from "./AppContextProvider";

const useAppContext = () => {
  const context = useContext(AppContext);
  const dispatch = useContext(AppDispatchContext);

  const goToNextMonth = () => {
    if (context.monthsToShow.length < 3) {
      return;
    }
    dispatch({ type: "GO_TO_NEXT_MONTH" });
  };
  const goToPreviousMonth = () => {
    if (context.monthsToShow.length < 3) {
      return;
    }
    dispatch({ type: "GO_TO_PREVIOUS_MONTH" });
  };
  const jumpToDate = (date: Date) => {
    console.log("jumpToDatejumpToDate");
    dispatch({ type: "JUMP_TO_DATE", data: date });
  };

  const updateOpenPopoverIndex = (index: string) => {
    dispatch({ type: "UPDATE_OPEN_POPOVER_INDEX", data: index });
  };

  const fetchAndUpdateCalendarEvents = async () => {
    const events = await getEvents();
    dispatch({ type: "UPDATE_CALENDAR_EVENTS", data: events });
  };

  return {
    ...context,
    activeDate: context.monthsToShow[context.monthsToShow.length - 2],
    jumpToDate,
    goToNextMonth,
    goToPreviousMonth,
    updateOpenPopoverIndex,
    fetchAndUpdateCalendarEvents,
  };
};

export default useAppContext;
