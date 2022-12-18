import React from "react";
import styles from "features/players/components/styles/VideoDetailsOverlay.module.css";
import Link from "next/link";
import Image from "next/image";

interface VideoDetailsOverlayProps {
  channelId: string;
  channelName: string;
  channelThumbnailUrl: string;
  videoTitle: string;
}

export const VideoDetailsOverlay = ({
  channelId,
  channelName,
  channelThumbnailUrl,
  videoTitle,
}: VideoDetailsOverlayProps) => {
  return (
    <div className={styles.channelContainer}>
      <Link
        href={`/twitch/channel/${channelId}`}
        data-testid="channelImageLink"
        className={styles.imageLink}
      >
        <span className={styles.srOnly}>{channelName}</span>
        <Image
          alt={`${channelName} thumbnail`}
          src={channelThumbnailUrl}
          width={55}
          height={55}
          className={styles.channelThumbnail}
        />
      </Link>

      <Link
        className={styles.channelName}
        href={`/twitch/channel/${channelId}`}
        data-testid="channelLink"
      >
        {channelName}
      </Link>
      <h2>{videoTitle}</h2>
    </div>
  );
};
