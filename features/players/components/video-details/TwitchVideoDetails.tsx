import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import React from "react";
import Image from "next/image";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";
import TwitchNameIcon from "icons/TwitchNameIcon";

interface TwitchVideoDetailsProps {
  videoId: string;
  toggleControls: () => void;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const TwitchVideoDetails = ({
  videoId,
  toggleControls,
}: TwitchVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <div className={styles.outerContainer}>
      {data && (
        <section className={styles.innerContainer}>
          <div className={styles.videoDetails}>
            <h2 className={styles.videoTitle}>{data.videoData.title}</h2>

            <div className={styles.metricsContainer}>
              <div className={styles.bar}></div>
              <p className={styles.uploadedDate}>
                {timeAgo.format(data.videoData.creationDate)}
              </p>
              <span className={styles.dot}>·</span>
              <p className={styles.views}>
                {formatter.format(data.videoData.views)} views
              </p>
            </div>
            <div className={styles.channelContainer}>
              <Image
                alt={`${data.userData.displayName} thumbnail`}
                src={data.userData.profilePictureUrl}
                width={55}
                height={55}
                className={styles.channelThumbnail}
              />
              <span className={styles.channelName}>
                {data.userData.displayName}
              </span>
              <button className={styles.subscribeButton}>Subscribe</button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <button onClick={toggleControls}>Toggle controls</button>
            <Link className={styles.twitchLink} href={data.videoData.url}>
              Watch on
              <TwitchNameIcon fill="#9147FF" className={styles.twitchName} />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};