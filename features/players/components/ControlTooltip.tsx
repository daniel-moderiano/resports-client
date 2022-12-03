interface ControlTooltipProps {
  children: React.ReactNode;
  className?: string;
}

export const ControlTooltip = ({
  children,
  className,
}: ControlTooltipProps) => {
  return <div className={className ? className : undefined}>{children}</div>;
};
