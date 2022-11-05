interface BackOneIconProps {
  className?: string;
  fill?: string;
}

const BackOneIcon = ({ className, fill = "#FFFFFF" }: BackOneIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      enableBackground="new 0 0 24 24"
      className={className ? className : undefined}
      fill={fill}
    >
      <path d="M12,5V1L7,6l5,5V7c3.3,0,6,2.7,6,6s-2.7,6-6,6s-6-2.7-6-6H4c0,4.4,3.6,8,8,8s8-3.6,8-8S16.4,5,12,5z" />
      <path d="M12.4,16h-0.9v-3.3l-1,0.3v-0.7l1.8-0.6h0.1C12.4,11.7,12.4,16,12.4,16z" />
    </svg>
  );
};

export default BackOneIcon;
