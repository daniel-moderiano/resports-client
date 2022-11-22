import styles from "features/players/components/styles/VideoControlIndicator.module.css";

interface VideoControlIndicatorProps {
  ariaLabel: string;
  icon: React.ReactNode;
}

export const VideoControlIndicator = ({
  ariaLabel,
  icon,
}: VideoControlIndicatorProps) => {
  return (
    <div className={styles.container} role="status" aria-label={ariaLabel}>
      {icon}
    </div>
  );
};

// Animation 500 ms linear, scale + opacity
