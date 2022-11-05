interface ForwardOneIconProps {
  className?: string;
  fill?: string;
  testId?: string;
}

const ForwardOneIcon = ({
  className,
  fill = "#FFFFFF",
  testId,
}: ForwardOneIconProps) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      className={className ? className : undefined}
      data-testid={testId ? testId : undefined}
      fill={fill}
    >
      <path d="M18,13c0,3.3-2.7,6-6,6s-6-2.7-6-6s2.7-6,6-6v4l5-5l-5-5v4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8H18z" />
      <polygon points="12.6,16.1 12.6,11.8 12.5,11.8 10.8,12.4 10.8,13.1 11.8,12.8 11.8,16.1 " />
    </svg>
  );
};

export default ForwardOneIcon;
