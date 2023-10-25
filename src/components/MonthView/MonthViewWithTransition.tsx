import React, { FC, useEffect, useRef, useState } from "react";
import MonthView from "./MonthView";
import useAppContext from "../../context/useAppContext";
import { Transition } from "react-transition-group";

import styles from "./MonthView.module.css";

const duration = 400;

const defaultStyles = {
  transition: `left ${duration}ms `,
};

const transitionStyles = {
  entering: { left: 0 },
  entered: { left: 0 },
  exiting: { left: -768 },
  exited: { left: -768 },
  unmounted: { left: -768 },
};

const MonthViewWithTransition: FC = () => {
  const [inProp, setInProp] = useState(false);
  const nodeRef = useRef(null);

  const { monthsToShow } = useAppContext();

  useEffect(() => {
    setInProp(true);
  }, [monthsToShow]);

  if (monthsToShow.length < 3) {
    return null;
  }

  return (
    <div className={styles.monthViewWithTransition}>
      <Transition nodeRef={nodeRef} in={inProp} timeout={duration}>
        {(state) => (
          <>
            <MonthView
              reference={nodeRef}
              style={{
                ...defaultStyles,
                left: transitionStyles[state].left - 768,
              }}
              key={monthsToShow[0].valueOf()}
              referenceMonth={monthsToShow[0].getMonth()}
              referenceYear={monthsToShow[0].getFullYear()}
            />
            <MonthView
              reference={nodeRef}
              style={{
                ...defaultStyles,
                left: transitionStyles[state].left,
              }}
              key={monthsToShow[1].valueOf()}
              referenceMonth={monthsToShow[1].getMonth()}
              referenceYear={monthsToShow[1].getFullYear()}
            />
            <MonthView
              reference={nodeRef}
              style={{
                ...defaultStyles,
                left: transitionStyles[state].left + 768,
              }}
              key={monthsToShow[2].valueOf()}
              referenceMonth={monthsToShow[2].getMonth()}
              referenceYear={monthsToShow[2].getFullYear()}
            />
          </>
        )}
      </Transition>
    </div>
  );
};

export default MonthViewWithTransition;
