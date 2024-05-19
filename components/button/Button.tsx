import styles from "components/button/Button.module.css";

export type ButtonSize = "default" | "compact";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "link"
  | "danger"
  | "none";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const Button = ({
  size = "default",
  variant = "primary",
  ...ButtonProps
}: ButtonProps) => {
  return (
    <button
      {...ButtonProps}
      className={`${styles[size]} ${styles[variant]} ${styles.button} ${ButtonProps.className}`}
    >
      {ButtonProps.children}
    </button>
  );
};
