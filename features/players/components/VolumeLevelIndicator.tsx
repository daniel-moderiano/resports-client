interface VolumeLevelIndicatorProps {
  currentVolume: number;
}

export const VolumeLevelIndicator = ({
  currentVolume,
}: VolumeLevelIndicatorProps) => {
  return <div>{currentVolume}</div>;
};
