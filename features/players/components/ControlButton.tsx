import styles from "features/players/components/styles/ControlButton.module.css";

interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  children?: React.ReactNode;
}

// TODO: Consider tooltip align prop

const ControlButton = ({
  tooltipText,
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
    >
      {children}
      <span className={`${styles.tooltip}`}>{tooltipText}</span>
    </button>
  );
};

export default ControlButton;
