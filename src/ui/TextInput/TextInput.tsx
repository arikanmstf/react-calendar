import styles from "./TextInput.module.css";
import { ChangeEvent, FC } from "react";

type Props = {
  onChange?: (event: ChangeEvent<any>) => void;
  value?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
};

const TextInput: FC<Props> = ({
  value,
  onChange,
  placeholder,
  required,
  maxLength,
}) => {
  return (
    <input
      className={styles.textInput}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
    />
  );
};

export default TextInput;
