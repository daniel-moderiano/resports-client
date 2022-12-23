import QuestionMarkIcon from "icons/QuestionMarkIcon";
import React from "react";
import styles from "features/players/components/styles/YouTubePlayerTooltip.module.css";

interface InfoTooltipProps {
  tooltipText: string;
  ariaLabel: string;
}

export const InfoTooltip = ({ tooltipText, ariaLabel }: InfoTooltipProps) => {
  return (
    <div className={`${styles.tooltip}`} aria-label={ariaLabel}>
      <QuestionMarkIcon className={styles.icon} />
      <p className={styles.tooltipText}>{tooltipText}</p>
    </div>
  );
};
