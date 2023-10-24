import { Splide, SplideSlide } from "@splidejs/react-splide";
import MonthView from "../MonthView";
import React, { FC } from "react";
import { Splide as SplideObject } from "@splidejs/splide";

type Props = {
  monthsToShow: Date[];
  onSplideMoved: (splide: SplideObject, index: number, prev: number) => void;
};

const SplideContainer: FC<Props> = ({ monthsToShow, onSplideMoved }) => {
  return (
    <Splide
      onMoved={onSplideMoved}
      options={{
        rewind: false,
        start: 1,
        keyboard: true,
        pagination: false,
      }}
    >
      {monthsToShow.map((referenceDate) => (
        <SplideSlide key={referenceDate.valueOf()}>
          <MonthView
            referenceMonth={referenceDate.getMonth()}
            referenceYear={referenceDate.getFullYear()}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SplideContainer;
