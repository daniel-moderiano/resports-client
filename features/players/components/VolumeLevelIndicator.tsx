interface VolumeLevelIndicatorProps {
  currentVolume: number;
}

export const VolumeLevelIndicator = ({
  currentVolume,
}: VolumeLevelIndicatorProps) => {
  const volumeAsPercentage = `${currentVolume * 100}%`;

  return (
    <div aria-label={`Volume level ${volumeAsPercentage}`}>
      {volumeAsPercentage}
    </div>
  );
};
