import styles from "features/players/components/styles/ControlButton.module.css";

interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  tooltipAlign?: "left" | "right";
  hideTooltip?: boolean;
  children?: React.ReactNode;
}

export const ControlButton = ({
  tooltipText,
  tooltipAlign,
  hideTooltip,
  children,
  ...props
}: ControlButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      onFocus={props.onFocus}
      aria-label={props["aria-label"]}
      className={styles.button}
      aria-haspopup={props["aria-haspopup"]}
      aria-expanded={props["aria-expanded"]}
      type="button"
    >
      {children}
      <span
        className={`${styles.tooltip} ${
          tooltipAlign === "left" ? styles.alignLeft : ""
        } ${tooltipAlign === "right" ? styles.alignRight : ""} ${
          hideTooltip ? styles.hide : ""
        }`}
      >
        {tooltipText}
      </span>
    </button>
  );
};
