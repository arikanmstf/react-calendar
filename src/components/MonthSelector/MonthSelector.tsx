import useAppContext from "../../context/useAppContext";
import Icon from "../../ui/icon";
import { Button } from "../../ui";
import styles from "./MonthSelector.module.css";

const MonthSelector = () => {
  const { jumpToDate, goToNextMonth, goToPreviousMonth } = useAppContext();
  const onPreviousMonthClick = () => {
    goToPreviousMonth();
  };
  const onNextMonthClick = () => {
    goToNextMonth();
  };
  const onTodayClick = () => {
    jumpToDate(new Date());
  };
  const buttonDisabled = false;

  return (
    <span className={styles.monthSelector}>
      <Button disabled={buttonDisabled} onClick={onTodayClick}>
        Today
      </Button>
      <div className={styles.navigationButtonContainer}>
        <Button disabled={buttonDisabled} icon onClick={onPreviousMonthClick}>
          <Icon name="chevron-left" width={32} height={32} />
        </Button>

        <Button disabled={buttonDisabled} icon onClick={onNextMonthClick}>
          <Icon name="chevron-right" width={32} height={32} />
        </Button>
      </div>
    </span>
  );
};

export default MonthSelector;
