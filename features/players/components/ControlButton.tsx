interface ControlButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  tooltipText: string;
  children?: React.ReactNode;
}

const ControlButton = ({
  tooltipText,
  children,
  ...props
}: ControlButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      aria-label={props["aria-label"]}
      className={props.className}
    >
      {children}
      <span>{tooltipText}</span>
    </button>
  );
};

export default ControlButton;
