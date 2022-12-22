import QuestionMarkIcon from "icons/QuestionMarkIcon";
import React from "react";
import styles from "features/players/components/styles/YouTubePlayerTooltip.module.css";

interface YouTubePlayerTooltipProps {
  showTooltip: boolean;
  tooltipText: string;
  ariaLabel: string;
}

const YouTubePlayerTooltip = ({
  showTooltip,
  tooltipText,
  ariaLabel,
}: YouTubePlayerTooltipProps) => {
  return (
    <div
      className={`${styles.tooltip} ${showTooltip ? styles.show : styles.hide}`}
      aria-label={ariaLabel}
    >
      <QuestionMarkIcon className={styles.icon} />
      <p className={styles.tooltipText}>{tooltipText}</p>
    </div>
  );
};

export default YouTubePlayerTooltip;
