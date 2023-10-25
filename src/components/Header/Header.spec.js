import render from "../../mocks/render";
import Header from "./Header";
import { fireEvent, screen, waitFor } from "@testing-library/react";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });

  it("should update month when year changed", async () => {
    render(<Header />);
    fireEvent.change(screen.getByDisplayValue("2023"), {
      target: { value: 2020 },
    });
    await waitFor(() => {
      expect(screen.getByText("October 2020")).toBeInTheDocument();
    });
  });
});
