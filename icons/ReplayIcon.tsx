interface ReplayIconProps {
  className?: string;
  fill?: string;
  testId?: string;
}

const ReplayIcon = ({
  className,
  fill = "#FFFFFF",
  testId,
}: ReplayIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      className={className ? className : undefined}
      data-testid={testId ? testId : undefined}
      fill={fill}
    >
      <g>
        <rect fill="none" height="24" width="24" />
        <rect fill="none" height="24" width="24" />
        <rect fill="none" height="24" width="24" />
      </g>
      <g>
        <g />
        <path d="M12,5V1L7,6l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6H4c0,4.42,3.58,8,8,8s8-3.58,8-8S16.42,5,12,5z" />
      </g>
    </svg>
  );
};

export default ReplayIcon;
