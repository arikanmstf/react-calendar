import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render correctly", () => {
    const { container } = render(<App />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
