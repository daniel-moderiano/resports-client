import QuestionMarkIcon from "icons/QuestionMarkIcon";
import React from "react";
import styles from "features/players/components/styles/YouTubePlayerTooltip.module.css";

interface TooltipProps {
  showTooltip: boolean;
  tooltipText: string;
  ariaLabel: string;
}

const Tooltip = ({ showTooltip, tooltipText, ariaLabel }: TooltipProps) => {
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

export default Tooltip;
