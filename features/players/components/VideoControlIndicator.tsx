import styles from "features/players/components/styles/VideoControlIndicator.module.css";

interface VideoControlIndicatorProps {
  ariaLabel: string;
  icon: React.ReactNode;
  triggerAnimation: boolean;
}

export const VideoControlIndicator = ({
  ariaLabel,
  icon,
  triggerAnimation,
}: VideoControlIndicatorProps) => {
  return (
    <div
      className={`${styles.container} ${
        triggerAnimation ? styles.triggerAnimation : styles.hide
      }`}
      role="status"
      aria-label={ariaLabel}
    >
      <div className={styles.iconWrapper}>{icon}</div>
    </div>
  );
};

// Animation 500 ms linear, scale + opacity
