import styles from "features/players/components/styles/ControlButton.module.css";

interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  children?: React.ReactNode;
}

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
    >
      {children}
      <span className={`${styles.tooltip}`}>{tooltipText}</span>
    </button>
  );
};

export default ControlButton;
