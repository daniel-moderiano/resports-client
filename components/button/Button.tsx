import styles from "components/button/Button.module.css";

export type ButtonSize = "default" | "compact";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outlined"
  | "link"
  | "danger";

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
      className={`${styles[size]} ${styles[variant]} ${styles.button}`}
      {...ButtonProps}
    >
      {ButtonProps.children}
    </button>
  );
};
