import render from "../../mocks/render";
import Day from "./Day";
import { screen } from "@testing-library/react";

describe("Day", () => {
  it("should render regular days correctly", () => {
    render(<Day date={new Date()} />);
    expect(screen.getByText("20")).toBeInTheDocument();
  });

  it("should render first day of month correctly", () => {
    render(<Day date={new Date("2023-10-01")} />);
    expect(screen.getByText("Oct")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should render week day correctly", () => {
    render(<Day date={new Date()} showWeekDay />);
    expect(screen.getByText("Fri")).toBeInTheDocument();
  });
});
