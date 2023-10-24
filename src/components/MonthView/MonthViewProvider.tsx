import { createContext, FC, ReactNode, useContext } from "react";

type MonthViewState = {
  referenceDate: Date;
};

type MonthViewProviderProps = {
  children: ReactNode;
  referenceDate: Date;
};

const MonthViewContext = createContext<MonthViewState>({
  referenceDate: new Date(),
});
export const useMonthViewContext = () => useContext(MonthViewContext);

const MonthViewProvider: FC<MonthViewProviderProps> = ({
  children,
  referenceDate,
}) => {
  return (
    <MonthViewContext.Provider value={{ referenceDate }}>
      {children}
    </MonthViewContext.Provider>
  );
};

export default MonthViewProvider;
