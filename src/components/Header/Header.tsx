import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./Header.module.css";
import useAppContext from "../../context/useAppContext";
import MonthSelector from "../MonthSelector";
import { Select } from "../../ui";

const yearOptions: Array<{ value: number; label: string }> = [];
const startYear = new Date().getFullYear();

for (let i = startYear - 25; i < startYear + 25; i++) {
  yearOptions.push({ value: i, label: `${i}` });
}

const Header: FC = () => {
  const { activeDate, jumpToDate } = useAppContext();
  const [selectedYear, setSelectedYear] = useState<number>(
    activeDate.getFullYear(),
  );
  useEffect(() => {
    setSelectedYear(activeDate.getFullYear());
  }, [activeDate]);

  const onYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedYearDate = new Date(
      +event.target.value,
      activeDate.getMonth(),
      activeDate.getDate(),
    );
    jumpToDate(selectedYearDate);
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <MonthSelector />
        <div className={styles.dateStringContainer}>
          <h3>
            {activeDate.toLocaleString("default", { month: "long" })}{" "}
            {activeDate.getFullYear()}
          </h3>
        </div>
      </div>

      <div>
        <Select
          value={selectedYear}
          options={yearOptions}
          onChange={onYearChange}
        />
      </div>
    </div>
  );
};

export default Header;
