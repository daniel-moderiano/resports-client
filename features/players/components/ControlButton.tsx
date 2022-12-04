import styles from "features/players/components/styles/ControlButton.module.css";

export type tooltipAlign = "left" | "right";

interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  tooltipAlign?: tooltipAlign;
  children?: React.ReactNode;
}

const ControlButton = ({
  tooltipText,
  children,
  tooltipAlign,
  ...props
}: ControlButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={styles.controlsBtn}
      aria-haspopup={props["aria-haspopup"]}
      aria-expanded={props["aria-expanded"]}
    >
      {children}
      <span
        className={`${styles.tooltip} ${
          tooltipAlign === "left" ? styles.tooltipAlignLeft : ""
        } ${tooltipAlign === "right" ? styles.tooltipAlignRight : ""}`}
      >
        {tooltipText}
      </span>
    </button>
  );
};

export default ControlButton;
