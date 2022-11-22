import styles from "features/players/components/styles/VideoControlIndicator.module.css";

interface VideoControlIndicatorProps {
  ariaLabel: string;
  icon: React.ReactNode;
  fadeOut: boolean;
}

export const VideoControlIndicator = ({
  ariaLabel,
  icon,
  fadeOut,
}: VideoControlIndicatorProps) => {
  return (
    <div
      className={`${styles.container} ${
        fadeOut ? styles.fadeOut : styles.hide
      }`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.iconWrapper}>{icon}</div>
    </div>
  );
};

// Animation 500 ms linear, scale + opacity
