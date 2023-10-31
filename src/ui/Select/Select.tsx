import { FC, SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ value: string | number; label: string }>;
};

const Select: FC<Props> = ({ value, options, ...other }) => {
  return (
    <select className={styles.select} value={value} {...other}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
export default Select;
