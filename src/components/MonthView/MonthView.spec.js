import render from "../../mocks/render";
import MonthView from "./MonthView";

describe("MonthView", () => {
  it("should render correctly", () => {
    const { container } = render(
      <MonthView referenceMonth={9} referenceYear={2023} />,
    );
    expect(container).toMatchSnapshot("OCT-2023");
  });

  it("should render future correctly", () => {
    const { container } = render(
      <MonthView referenceMonth={1} referenceYear={2023} />,
    );
    expect(container).toMatchSnapshot("FEB-2032");
  });

  it("should render past correctly", () => {
    const { container } = render(
      <MonthView referenceMonth={2} referenceYear={2023} />,
    );
    expect(container).toMatchSnapshot("MAR-1990");
  });
});
