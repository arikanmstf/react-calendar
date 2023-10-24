import styles from "../Calendar/Calendar.module.css";
import { Splide as SplideObject } from "@splidejs/splide";
import React, { FC, useState } from "react";
import { useAppContext } from "../../context/app";
import SplideContainer from "./SplideContainer";

type Props = {};

const MonthViewWithSplide: FC<Props> = () => {
  const { goToNextMonth, goToPreviousMonth, monthsToShow } = useAppContext();
  const [key, setKey] = useState(0);
  const onSplideMoved = (
    splide: SplideObject,
    newIndex: number,
    prevIndex: number,
  ) => {
    if (prevIndex === 1 && newIndex === 2) {
      setKey((prevState) => prevState + 1);
      goToNextMonth();
    }
    if (prevIndex === 1 && newIndex === 0) {
      setKey((prevState) => prevState + 1);
      goToPreviousMonth();
    }
  };

  return (
    <div className={styles.monthContainer}>
      <SplideContainer
        key={key}
        onSplideMoved={onSplideMoved}
        monthsToShow={monthsToShow}
      />
    </div>
  );
};

export default MonthViewWithSplide;
