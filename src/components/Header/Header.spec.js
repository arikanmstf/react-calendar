import render from "../../mocks/render";
import Header from "./Header";
import { screen } from "@testing-library/react";

describe("Header", () => {
  it("should render correctly", () => {
    render(<Header />);
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("October 2023")).toBeInTheDocument();
  });
});
