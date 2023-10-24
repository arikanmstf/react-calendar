import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useReducer,
  Reducer,
  Dispatch,
} from "react";

type AppState = {
  activeDate: Date;
  activeMonth: "CURRENT" | "NEXT" | "PREVIOUS";
};
type AppAction = {
  type: "UPDATE_ACTIVE_DATE" | "UPDATE_ACTIVE_MONTH" | "ADD_EVENT";
  data: Date;
};

const AppContext = createContext<AppState>({
  activeDate: new Date(),
  activeMonth: "CURRENT",
});
const AppDispatchContext = createContext<Dispatch<AppAction>>(() => {
  throw new Error("Please initialize the dispatch function.");
});

const appReducer: Reducer<AppState, AppAction> = (
  state: AppState,
  action: AppAction,
) => {
  switch (action.type) {
    case "ADD_EVENT":
      return {
        ...state,
      };
    case "UPDATE_ACTIVE_DATE":
      return {
        ...state,
        activeMonth: "CURRENT",
        activeDate: action.data,
      };
    case "UPDATE_ACTIVE_MONTH":
      const activeMonth =
        state.activeDate.valueOf() > action.data.valueOf()
          ? "PREVIOUS"
          : "NEXT";
      return {
        ...state,
        activeMonth,
      };
  }
  return state;
};

type AppContextProviderProps = {
  children: ReactNode;
  date: Date;
};
const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
  date,
}) => {
  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(
    appReducer,
    { activeDate: date, activeMonth: "CURRENT" },
  );

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
  const updateActiveDate = (data: Date) => {
    dispatch({ type: "UPDATE_ACTIVE_MONTH", data });
    setTimeout(() => {
      dispatch({ type: "UPDATE_ACTIVE_DATE", data });
    }, 1000);
  };
  return {
    ...context,
    updateActiveDate,
  };
};

export default AppContextProvider;
