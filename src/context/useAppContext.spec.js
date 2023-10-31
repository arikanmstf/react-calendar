import useAppContext from "./useAppContext";
import render from "../mocks/render";
import { screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { getEvents } from "../services/events";
import mockCalendarEvents from "../mocks/mockCalendarEvents";

const LogState = ({ toCall, date, index } = {}) => {
  const {
    goToNextMonth,
    goToPreviousMonth,
    jumpToDate,
    updateOpenPopoverIndex,
    fetchAndUpdateCalendarEvents,
    ...state
  } = useAppContext();

  useEffect(() => {
    switch (toCall) {
      case "goToNextMonth":
        goToNextMonth();
        break;
      case "goToPreviousMonth":
        goToPreviousMonth();
        break;
      case "jumpToDate":
        jumpToDate(date);
        break;
      case "updateOpenPopoverIndex":
        updateOpenPopoverIndex(index);
        break;
      case "fetchAndUpdateCalendarEvents":
        void fetchAndUpdateCalendarEvents();
        break;
      default:
        break;
    }
  }, [toCall]); // eslint-disable-line
  return <pre>{JSON.stringify(state)}</pre>;
};

describe("useAppContext", () => {
  test("timezone should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });

  it("should return state correctly", () => {
    const { container } = render(<LogState />);
    expect(
      screen.getByText(/"activeDate":"2023-10-20T00:00:00.000Z"/),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should call goToNextMonth correctly", () => {
    const { container } = render(<LogState toCall="goToNextMonth" />);
    expect(
      screen.getByText(/"activeDate":"2023-11-01T00:00:00.000Z"/),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should call goToPreviousMonth correctly", () => {
    const { container } = render(<LogState toCall="goToPreviousMonth" />);
    expect(
      screen.getByText(/"activeDate":"2023-09-01T00:00:00.000Z"/),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should call jumpToDate correctly", () => {
    const { container } = render(
      <LogState toCall="jumpToDate" date={new Date("2024-06-29")} />,
    );
    expect(
      screen.getByText(/"activeDate":"2024-06-29T00:00:00.000Z"/),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should call updateOpenPopoverIndex correctly", () => {
    const { container } = render(
      <LogState toCall="updateOpenPopoverIndex" index="TEST_INDEX" />,
    );
    expect(
      screen.getByText(/"openPopoverIndex":"TEST_INDEX"/),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should call fetchAndUpdateCalendarEvents correctly", async () => {
    getEvents.mockResolvedValue(mockCalendarEvents);
    const { container } = render(
      <LogState toCall="fetchAndUpdateCalendarEvents" />,
    );
    await waitFor(() => {
      expect(
        screen.getByText(/"calendarEvents":{"1697760000000"/),
      ).toBeInTheDocument();
    });
    expect(container).toMatchSnapshot();
  });
});
