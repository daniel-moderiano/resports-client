import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import React from "react";
import Image from "next/image";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";
import TwitchNameIcon from "icons/TwitchNameIcon";
import { useControlsContext } from "providers/ControlsContext";

interface TwitchVideoDetailsProps {
  videoId: string;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const TwitchVideoDetails = ({ videoId }: TwitchVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);
  const { controlsDisabled, setControlsDisabled } = useControlsContext();

  console.log(controlsDisabled);

  return (
    <div className={styles.outerContainer}>
      {data && (
        <section className={styles.innerContainer}>
          <div className={styles.videoDetails}>
            <h2 className={styles.videoTitle}>{data.videoData.title}</h2>

            <div className={styles.metricsContainer}>
              <div className={styles.bar}></div>
              <p>{timeAgo.format(data.videoData.creationDate)}</p>
              <span className={styles.dot}>·</span>
              <p>{formatter.format(data.videoData.views)} views</p>
            </div>
            <div className={styles.channelContainer}>
              <Link
                href={`/twitch/channel/${data.userData.id}`}
                data-testid="channelImageLink"
                className={styles.imageLink}
              >
                <span className={styles.srOnly}>
                  {data.userData.displayName}
                </span>
                <Image
                  alt={`${data.userData.displayName} thumbnail`}
                  src={data.userData.profilePictureUrl}
                  width={55}
                  height={55}
                  className={styles.channelThumbnail}
                />
              </Link>

              <Link
                className={styles.channelName}
                href={`/twitch/channel/${data.userData.id}`}
                data-testid="channelLink"
              >
                {data.userData.displayName}
              </Link>
              <button className={styles.saveButton}>+ Save</button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Link className={styles.twitchLink} href={data.videoData.url}>
              Watch on
              <TwitchNameIcon fill="#9147FF" className={styles.twitchName} />
            </Link>
            <div className={styles.toggleSwitch}>
              <label className={styles.switch}>
                <span className={styles.labelText}>Enable controls</span>
                <input
                  type="checkbox"
                  className={styles.input}
                  checked={!controlsDisabled}
                  onChange={() => setControlsDisabled(!controlsDisabled)}
                />
                <span className={`${styles.slider} ${styles.round}`}></span>
              </label>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
