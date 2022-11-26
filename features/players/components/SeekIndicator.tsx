import styles from "features/players/components/styles/SeekIndicator.module.css";

interface SeekIndicatorProps {
  projectedSeekInSeconds: number;
}

export const SeekIndicator = ({
  projectedSeekInSeconds,
}: SeekIndicatorProps) => {
  // TODO: Seek duration conversion using module operator
  // TODO: Customise ariaLabel depending on forward/backward seek

  return (
    <div className="" aria-label="">
      {projectedSeekInSeconds}
    </div>
  );
};
