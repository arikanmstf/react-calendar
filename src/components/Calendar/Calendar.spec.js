import React from "react";
import { screen } from "@testing-library/react";
import Calendar from "./Calendar";
import render from "../../mocks/render";

describe("Calendar", () => {
  it("should render correctly", () => {
    const { container } = render(<Calendar />);
    expect(screen.getByText("October 2023")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
