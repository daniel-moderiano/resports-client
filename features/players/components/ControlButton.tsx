import styles from "features/players/components/styles/ControlButton.module.css";

export type tooltipAlign = "left" | "right";

interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  tooltipAlign?: tooltipAlign;
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
      aria-label={props["aria-label"]}
      className={styles.controlsBtn}
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
