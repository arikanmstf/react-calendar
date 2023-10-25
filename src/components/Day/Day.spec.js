import render from "../../mocks/render";
import Day from "./Day";
import { fireEvent, screen } from "@testing-library/react";
import useAppContext from "../../context/useAppContext";
import mockCalendarEvents from "../../mocks/mockCalendarEvents";

jest.mock("../../context/useAppContext");

describe("Day", () => {
  const updateOpenPopoverIndex = jest.fn();
  beforeEach(() => {
    useAppContext.mockReturnValue({
      openPopoverIndex: "",
      updateOpenPopoverIndex,
      calendarEvents: {},
    });
    jest.clearAllMocks();
  });

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

  it("should render correctly when there are events", () => {
    useAppContext.mockReturnValue({
      openPopoverIndex: "",
      updateOpenPopoverIndex,
      calendarEvents: mockCalendarEvents,
    });
    render(<Day date={new Date()} />);
    expect(screen.getAllByTestId("indicator")).toHaveLength(
      mockCalendarEvents["1697760000000"].length,
    );
  });

  it("should open popover when clicked", () => {
    render(<Day date={new Date()} showWeekDay />);
    fireEvent.click(screen.getByText("20"));
    expect(updateOpenPopoverIndex).toHaveBeenCalledWith(
      "1697760000000_1697760000000",
    );
  });
});
