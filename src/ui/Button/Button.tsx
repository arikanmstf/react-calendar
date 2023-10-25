import { FC } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../types";

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  icon,
  disabled,
  className = "",
  accent = "NEUTRAL",
  role,
  ...other
}) => {
  return (
    <button
      {...other}
      role={role}
      disabled={disabled}
      className={`${styles.button} ${
        icon ? styles.iconButton : styles.textButton
      } ${accent === "POSITIVE" ? styles.positive : ""} ${
        accent === "NEGATIVE" ? styles.negative : ""
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
