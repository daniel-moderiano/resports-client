interface PlayIconProps {
  className?: string;
  fill?: string;
  testId?: string;
}

const PlayIcon = ({ className, fill, testId }: PlayIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={fill}
      className={className ? className : undefined}
      data-testid={testId ? testId : undefined}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M8 5v14l11-7z" />
    </svg>
  );
};

export default PlayIcon;
