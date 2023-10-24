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
  monthsToShow: Date[];
  splideIndex: number;
};
type AppAction = {
  type: "GO_TO_NEXT_MONTH" | "GO_TO_PREVIOUS_MONTH" | "UPDATE_SPLIDE_INDEX";
  data?: any;
};

const AppContext = createContext<AppState>({
  activeDate: new Date(),
  monthsToShow: [],
  splideIndex: 1,
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
    case "UPDATE_SPLIDE_INDEX":
      console.log(action);
      return {
        ...state,
        splideIndex: action.data,
      };
    case "GO_TO_PREVIOUS_MONTH": {
      const newPreviousMonth = new Date(middleMonth);
      newPreviousMonth.setMonth(newPreviousMonth.getMonth() - 2);

      return {
        ...state,
        monthsToShow: [newPreviousMonth, monthsToShow[0], monthsToShow[1]],
      };
    }

    case "GO_TO_NEXT_MONTH": {
      const newNextMonth = new Date(middleMonth);
      newNextMonth.setMonth(newNextMonth.getMonth() + 2);

      return {
        ...state,
        monthsToShow: [monthsToShow[1], monthsToShow[2], newNextMonth],
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
      splideIndex: 1,
    },
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

  const updateSplideIndex = (index: number) => {
    dispatch({ type: "UPDATE_SPLIDE_INDEX", data: index });
  };

  return {
    ...context,
    activeDate: context.monthsToShow[context.monthsToShow.length - 2],
    goToNextMonth,
    goToPreviousMonth,
    updateSplideIndex,
  };
};

export default AppContextProvider;
