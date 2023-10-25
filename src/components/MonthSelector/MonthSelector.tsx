import { Button } from "../../ui";
import styles from "./MonthSelector.module.css";
import { useAppContext } from "../../context/app";

const MonthSelector = () => {
  const { jumpToDate } = useAppContext();
  const onTodayClick = () => {
    jumpToDate(new Date());
  };

  return (
    <span className={styles.monthSelector}>
      <Button onClick={onTodayClick}>Today</Button>
    </span>
  );
};

export default MonthSelector;
