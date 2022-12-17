interface SwitchPlayerIconProps {
  className?: string;
  fill?: string;
  testId?: string;
}

const SwitchPlayerIcon = ({
  className,
  fill = "#FFFFFF",
  testId,
}: SwitchPlayerIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24.53 24.14"
      className={className ? className : undefined}
      data-testid={testId ? testId : undefined}
    >
      <path
        d="M277,134h24v24H277Z"
        transform="translate(-277 -134)"
        fill="none"
      />
      <path
        d="M285.11,155.62a10.49,10.49,0,0,1-6-8.48h-1.5a12,12,0,0,0,11.95,11l.66,0-3.81-3.81Zm4.48-21.48-.66,0,3.81,3.81,1.33-1.33a10.47,10.47,0,0,1,6,8.48h1.5A12,12,0,0,0,289.59,134.14Z"
        transform="translate(-277 -134)"
        fill={fill}
      />
      <polygon
        points="11.46 9.29 11.46 14.71 15.68 12 11.46 9.29"
        fill={fill}
      />
      <path
        d="M294.79,141.18h-9.64a1.21,1.21,0,0,0-1.21,1.21v7.22a1.21,1.21,0,0,0,1.21,1.21h9.64a1.21,1.21,0,0,0,1.2-1.21v-7.22A1.21,1.21,0,0,0,294.79,141.18Zm0,8.44h-9.64v-7.24h9.64Z"
        transform="translate(-277 -134)"
        fill={fill}
      />
    </svg>
  );
};

export default SwitchPlayerIcon;
