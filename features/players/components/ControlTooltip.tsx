interface ControlTooltipProps {
  text: string;
}

export const ControlTooltip = ({ text }: ControlTooltipProps) => {
  return <div>{text}</div>;
};
