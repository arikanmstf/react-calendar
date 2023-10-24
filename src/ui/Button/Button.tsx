import { FC } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "../types";

const Button: FC<ButtonProps> = ({ onClick, children, icon, disabled }) => {
  return (
    <button
      disabled={disabled}
      className={`${styles.button} ${
        icon ? styles.iconButton : styles.textButton
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
