import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useReducer,
  Reducer,
  Dispatch,
  useEffect,
} from "react";
import { CalendarEvent, getEvents, resetEvents } from "../services/events";

type AppState = {
  activeDate: Date;
  monthsToShow: Date[];
  calendarEvents: Record<number, CalendarEvent[]>;
  openPopoverIndex: string;
};
type AppAction = {
  type:
    | "GO_TO_NEXT_MONTH"
    | "GO_TO_PREVIOUS_MONTH"
    | "JUMP_TO_DATE"
    | "UPDATE_OPEN_POPOVER_INDEX"
    | "UPDATE_CALENDAR_EVENTS";
  data?: any;
};

const AppContext = createContext<AppState>({
  activeDate: new Date(),
  monthsToShow: [],
  openPopoverIndex: "",
  calendarEvents: {},
});
const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {
  throw new Error("Please initialize the dispatch function.");
});

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

type AppContextProviderProps = {
  children: ReactNode;
  date: Date;
};
const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
  date: middleMonth,
}) => {
  const nextMonth = new Date(middleMonth);
  nextMonth.setMonth(middleMonth.getMonth() + 1);

  const previousMonth = new Date(middleMonth);
  previousMonth.setMonth(middleMonth.getMonth() - 1);

  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    appReducer,
    {
      activeDate: middleMonth,
      monthsToShow: [previousMonth, middleMonth, nextMonth],
      openPopoverIndex: "",
      calendarEvents: {},
    },
  );

  useEffect(() => {
    // fetch events when app initialised.
    // commented out because,it is requested to delete all events on app load.
    // const fetch = async () => {
    //   const events = await getEvents();
    //   dispatch({ type: "UPDATE_CALENDAR_EVENTS", data: events });
    // };
    resetEvents();
  }, []);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
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

export default AppContextProvider;
