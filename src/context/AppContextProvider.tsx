import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  useEffect,
  useReducer,
} from "react";
import { resetEvents } from "../services/events";
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
export const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {
  throw new Error("Please initialize the dispatch function.");
});

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

export default AppContextProvider;
