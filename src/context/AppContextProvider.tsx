import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import { flushEvents } from "../services/events";
import appReducer, { AppAction, AppState } from "./appReducer";

type AppContextProviderProps = {
  children: ReactNode;
  date: Date;
};

export const AppContext = createContext<AppState>({
  activeDate: new Date(),
  monthsToShow: [],
  openPopoverIndex: "",
  calendarEvents: {},
});
AppContext.displayName = "AppContext";

export const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {
  throw new Error("Please initialize the dispatch function.");
});
AppDispatchContext.displayName = "AppDispatchContext";

const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
  date: middleMonth,
}) => {
  const nextMonth = new Date(middleMonth);
  nextMonth.setFullYear(
    middleMonth.getFullYear(),
    middleMonth.getMonth() + 1,
    1,
  );

  const previousMonth = new Date(middleMonth);
  previousMonth.setFullYear(
    middleMonth.getFullYear(),
    middleMonth.getMonth() - 1,
    1,
  );

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
    flushEvents();
  }, []);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
