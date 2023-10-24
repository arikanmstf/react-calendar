import { useAppContext } from "../../context/app";
import { ChevronLeft, ChevronRight } from "../../ui/icons";
import { Button } from "../../ui";
import styles from "./MonthSelector.module.css";

const MonthSelector = () => {
  const { updateActiveDate, activeDate } = useAppContext();
  const onPreviousMonthClick = () => {
    activeDate.setMonth(activeDate.getMonth() - 1);
    updateActiveDate(new Date(activeDate));
  };
  const onNextMonthClick = () => {
    activeDate.setMonth(activeDate.getMonth() + 1);
    updateActiveDate(new Date(activeDate));
  };
  const onTodayClick = () => {
    updateActiveDate(new Date());
  };

  return (
    <span className={styles.monthSelector}>
      <Button onClick={onTodayClick}>Today</Button>
      <div className={styles.navigationButtonContainer}>
        <Button icon onClick={onPreviousMonthClick}>
          <ChevronLeft />
        </Button>

        <Button icon onClick={onNextMonthClick}>
          <ChevronRight />
        </Button>
      </div>
    </span>
  );
};

export default MonthSelector;
