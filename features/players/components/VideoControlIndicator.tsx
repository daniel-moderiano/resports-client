interface VideoControlIndicatorProps {
  ariaLabel: string;
  icon: React.ReactNode;
}

export const VideoControlIndicator = ({
  ariaLabel,
  icon,
}: VideoControlIndicatorProps) => {
  return (
    <div role="status" aria-label={ariaLabel}>
      {icon}
    </div>
  );
};

// Animation 500 ms linear, scale + opacity
