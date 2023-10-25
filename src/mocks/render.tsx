import { render as renderRTL } from "@testing-library/react";
import AppContextProvider from "../context/AppContextProvider";
import { ReactElement } from "react";

const render = (ui: ReactElement, { date }: { date?: Date } = {}) =>
  renderRTL(ui, {
    wrapper: ({ children }) => (
      <AppContextProvider date={date || new Date()}>
        {children}
      </AppContextProvider>
    ),
  });

export default render;
