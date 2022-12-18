import React from "react";
import styles from "features/players/components/styles/TwitchVideoDetailsOverlay.module.css";
import Link from "next/link";
import Image from "next/image";
import { TwitchVideo } from "features/channels";

interface TwitchVideoDetailsOverlayProps {
  videoDetailsData: TwitchVideo;
}

export const TwitchVideoDetailsOverlay = ({
  videoDetailsData,
}: TwitchVideoDetailsOverlayProps) => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.videoDetails}>
        <h2 className={styles.videoTitle}>
          {videoDetailsData.videoData.title}
        </h2>

        <div className={styles.channelContainer}>
          <Link
            href={`/twitch/channel/${videoDetailsData.userData.id}`}
            data-testid="channelImageLink"
            className={styles.imageLink}
          >
            <span className={styles.srOnly}>
              {videoDetailsData.userData.displayName}
            </span>
            <Image
              alt={`${videoDetailsData.userData.displayName} thumbnail`}
              src={videoDetailsData.userData.profilePictureUrl}
              width={55}
              height={55}
              className={styles.channelThumbnail}
            />
          </Link>

          <Link
            className={styles.channelName}
            href={`/twitch/channel/${videoDetailsData.userData.id}`}
            data-testid="channelLink"
          >
            {videoDetailsData.userData.displayName}
          </Link>
          <button className={styles.saveButton}>+ Save</button>
        </div>
      </div>
    </div>
  );
};
