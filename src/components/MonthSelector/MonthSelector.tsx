import { useAppContext } from "../../context/app";
import { ChevronLeft, ChevronRight } from "../../ui/icons";
import { Button } from "../../ui";
import styles from "./MonthSelector.module.css";

const MonthSelector = () => {
  const { updateActiveDate, activeDate, activeMonth } = useAppContext();
  const onPreviousMonthClick = () => {
    const newDate = new Date(activeDate);
    newDate.setMonth(newDate.getMonth() - 1);
    updateActiveDate(newDate);
  };
  const onNextMonthClick = () => {
    const newDate = new Date(activeDate);
    newDate.setMonth(newDate.getMonth() + 1);
    updateActiveDate(newDate);
  };
  const onTodayClick = () => {
    updateActiveDate(new Date());
  };
  const buttonDisabled = activeMonth !== "CURRENT";

  return (
    <span className={styles.monthSelector}>
      <Button disabled={buttonDisabled} onClick={onTodayClick}>
        Today
      </Button>
      <div className={styles.navigationButtonContainer}>
        <Button disabled={buttonDisabled} icon onClick={onPreviousMonthClick}>
          <ChevronLeft />
        </Button>

        <Button disabled={buttonDisabled} icon onClick={onNextMonthClick}>
          <ChevronRight />
        </Button>
      </div>
    </span>
  );
};

export default MonthSelector;
