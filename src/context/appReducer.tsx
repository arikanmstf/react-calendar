import { Reducer } from "react";
import { CalendarEvent } from "../services/events";

export type AppState = {
  activeDate: Date;
  monthsToShow: Date[];
  calendarEvents: Record<number, CalendarEvent[]>;
  openPopoverIndex: string;
};
export type AppAction = {
  type:
    | "GO_TO_NEXT_MONTH"
    | "GO_TO_PREVIOUS_MONTH"
    | "JUMP_TO_DATE"
    | "UPDATE_OPEN_POPOVER_INDEX"
    | "UPDATE_CALENDAR_EVENTS";
  data?: any;
};

const appReducer: Reducer<AppState, AppAction> = (
  state: AppState,
  action: AppAction,
) => {
  const { monthsToShow } = state;
  const middleMonth = monthsToShow[monthsToShow.length - 2];

  switch (action.type) {
    case "UPDATE_CALENDAR_EVENTS":
      return {
        ...state,
        calendarEvents: action.data,
      };
    case "JUMP_TO_DATE": {
      const middleMonth = action.data;
      const newPreviousMonth = new Date(middleMonth);
      newPreviousMonth.setMonth(newPreviousMonth.getMonth() - 1);
      const newNextMonth = new Date(middleMonth);
      newNextMonth.setMonth(newNextMonth.getMonth() + 1);

      return {
        ...state,
        monthsToShow: [newPreviousMonth, middleMonth, newNextMonth],
      };
    }

    case "UPDATE_OPEN_POPOVER_INDEX":
      return {
        ...state,
        openPopoverIndex: action.data,
      };
    case "GO_TO_PREVIOUS_MONTH": {
      const newPreviousMonth = new Date(middleMonth);
      newPreviousMonth.setMonth(newPreviousMonth.getMonth() - 2);

      return {
        ...state,
        monthsToShow: [newPreviousMonth, monthsToShow[0], monthsToShow[1]],
        openPopoverIndex: "",
      };
    }

    case "GO_TO_NEXT_MONTH": {
      const newNextMonth = new Date(middleMonth);
      newNextMonth.setMonth(newNextMonth.getMonth() + 2);

      return {
        ...state,
        monthsToShow: [monthsToShow[1], monthsToShow[2], newNextMonth],
        openPopoverIndex: "",
      };
    }
  }
  return state;
};

export default appReducer;
