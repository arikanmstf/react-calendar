import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import render from "../../mocks/render";
import CalendarEventForm from "./CalendarEventForm";
import { deleteEvent, postEvent } from "../../services/events";
import useAppContext from "../../context/useAppContext";
import mockCalendarEvents from "../../mocks/mockCalendarEvents";

jest.mock("../../context/useAppContext", () => jest.fn());

describe("CalendarEventForm", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    useAppContext.mockReturnValue({
      updateOpenPopoverIndex: jest.fn(),
      fetchAndUpdateCalendarEvents: jest.fn(),
      calendarEvents: {},
    });
  });

  it("should render correctly", () => {
    const { container } = render(<CalendarEventForm date={new Date()} />);
    expect(screen.getByText("Fri Oct 20 2023")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("should prevent submitting with empty form", () => {
    render(<CalendarEventForm date={new Date()} />);
    fireEvent.click(screen.getByText("Save"));
    expect(postEvent).not.toHaveBeenCalled();
  });

  it("should make correct api call on submit", () => {
    render(<CalendarEventForm date={new Date()} />);
    fireEvent.change(screen.getByPlaceholderText("Add new event"), {
      target: {
        value: "My birthday",
      },
    });
    expect(screen.getByDisplayValue("My birthday")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Save"));
    expect(postEvent).toHaveBeenCalledWith({
      date: 1697760000000, // value of 20/10/2023
      title: "My birthday",
      id: expect.any(String),
    });
  });

  describe("when listing events", () => {
    beforeEach(() => {
      useAppContext.mockReturnValue({
        updateOpenPopoverIndex: jest.fn(),
        fetchAndUpdateCalendarEvents: jest.fn(),
        calendarEvents: mockCalendarEvents,
      });
    });

    it("should list events correctly", () => {
      render(<CalendarEventForm date={new Date()} />);
      expect(
        screen.getByText(mockCalendarEvents["1697760000000"][0].title),
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockCalendarEvents["1697760000000"][1].title),
      ).toBeInTheDocument();
    });

    it("should make correct api call on delete", () => {
      render(<CalendarEventForm date={new Date()} />);
      fireEvent.click(screen.getAllByTestId("delete-button")[0]);
      expect(deleteEvent).toHaveBeenCalledWith(
        mockCalendarEvents["1697760000000"][0],
      );
    });
  });
});
