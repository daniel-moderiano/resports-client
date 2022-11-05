interface RoundPauseIconProps {
  className?: string;
  fill?: string;
  testId?: string;
}

const RoundPauseIcon = ({
  className,
  fill = "#FFFFFF",
  testId,
}: RoundPauseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      fill={fill}
      className={className ? className : undefined}
      data-testid={testId ? testId : undefined}
    >
      <g>
        <rect fill="none" height="32" width="32" />
      </g>
      <g>
        <g>
          <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z" />
        </g>
      </g>
    </svg>
  );
};

export default RoundPauseIcon;
