import styles from "features/players/components/styles/VolumeLevelIndicator.module.css";

interface VolumeLevelIndicatorProps {
  currentVolume: number;
}

export const VolumeLevelIndicator = ({
  currentVolume,
}: VolumeLevelIndicatorProps) => {
  const volumeAsPercentage = `${(currentVolume * 100).toFixed(0)}%`;

  return (
    <div
      className={styles.container}
      aria-label={`Volume level ${volumeAsPercentage}`}
    >
      {volumeAsPercentage}
    </div>
  );
};
