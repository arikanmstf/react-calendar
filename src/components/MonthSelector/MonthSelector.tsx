import { Button } from "../../ui";
import styles from "./MonthSelector.module.css";

const MonthSelector = () => {
  const onTodayClick = () => {
    // updateActiveDate(new Date());
  };

  return (
    <span className={styles.monthSelector}>
      <Button onClick={onTodayClick}>Today</Button>
    </span>
  );
};

export default MonthSelector;
