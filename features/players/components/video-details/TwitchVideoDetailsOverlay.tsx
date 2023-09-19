import React from "react";
import styles from "features/players/components/styles/TwitchVideoDetailsOverlay.module.css";
import { TwitchVideo } from "features/channels";

interface TwitchVideoDetailsOverlayProps {
  videoDetails: TwitchVideo;
}

export const TwitchVideoDetailsOverlay = ({
  videoDetails,
}: TwitchVideoDetailsOverlayProps) => {
  const { videoData, userData } = videoDetails;
  return (
    <div className={styles.outerContainer}>
      <div className={styles.gradient}></div>
      <div className={styles.innerContainer}>
        <span className={styles.srOnly}>{userData.displayName}</span>
        <img
          alt={`${userData.displayName} thumbnail`}
          src={userData.profilePictureUrl}
          width={45}
          height={45}
          className={styles.channelThumbnail}
        />
        <h2 className={styles.videoTitle}>{videoData.title}</h2>
      </div>
    </div>
  );
};
