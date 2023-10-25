import render from "../../mocks/render";
import MonthSelector from "./MonthSelector";
import { fireEvent, screen } from "@testing-library/react";
import useAppContext from "../../context/useAppContext";

jest.mock("../../context/useAppContext", () => jest.fn());

describe("MonthSelector", () => {
  const jumpToDate = jest.fn();

  beforeEach(() => {
    useAppContext.mockReturnValue({
      jumpToDate,
    });
  });

  it("should render correctly", () => {
    render(<MonthSelector />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("should switch to current month when clicked on today", () => {
    render(<MonthSelector />, { date: new Date("2020-06-12") });
    fireEvent.click(screen.getByText("Today"));
    expect(jumpToDate).toHaveBeenCalledWith(new Date());
  });
});
