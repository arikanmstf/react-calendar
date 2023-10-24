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
};
type AppAction = {
  type: "UPDATE_ACTIVE_DATE" | "ADD_EVENT";
  data: Date;
};

const AppContext = createContext<AppState>({
  activeDate: new Date(),
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
        activeDate: action.data,
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
    { activeDate: date },
  );

  return (
    <AppContext.Provider value={{ activeDate: state.activeDate }}>
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
    dispatch({ type: "UPDATE_ACTIVE_DATE", data });
  };
  return {
    ...context,
    updateActiveDate,
  };
};

export default AppContextProvider;
