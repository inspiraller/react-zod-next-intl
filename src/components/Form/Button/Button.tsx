import { clsx } from "clsx";
import styles from "./button.module.css";
interface Props {
  type: "submit" | "button" | "reset";
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "tertiary" | "reset";
}
export const Button = ({ children, type, variant, onClick }: Props) => {
  const className = clsx(styles.button, variant ? styles[variant] : "");
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
