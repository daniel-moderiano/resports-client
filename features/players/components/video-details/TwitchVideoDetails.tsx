import React from "react";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";
import TwitchNameIcon from "icons/TwitchNameIcon";
import { TwitchVideo } from "features/channels";
import { Routes } from "config/routes";
import { SaveChannelButton } from "features/players";
import { useAuth0 } from "@auth0/auth0-react";

interface TwitchVideoDetailsProps {
  videoDetails: TwitchVideo;
  toggleControls: () => void;
  controlsDisabled: boolean;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const TwitchVideoDetails = ({
  videoDetails,
  toggleControls,
  controlsDisabled,
}: TwitchVideoDetailsProps) => {
  const { userData, videoData } = videoDetails;
  const { isAuthenticated } = useAuth0();
  return (
    <div className={styles.outerContainer}>
      <section className={styles.innerContainer}>
        <div className={styles.videoDetails}>
          <h2 className={styles.videoTitle}>{videoData.title}</h2>

          <div className={styles.metricsContainer}>
            <div className={styles.bar}></div>
            <p>{timeAgo.format(videoData.creationDate)}</p>
            <span className={styles.dot}>·</span>
            <p>{formatter.format(videoData.views)} views</p>
          </div>
          <div className={styles.channelContainer}>
            <Link
              href={`${Routes.twitch.channel}/${userData.id}`}
              data-testid="channelImageLink"
              className={styles.imageLink}
            >
              <span className={styles.srOnly}>{userData.displayName}</span>
              <img
                alt={`${userData.displayName} thumbnail`}
                src={userData.profilePictureUrl}
                width={55}
                height={55}
                className={styles.channelThumbnail}
              />
            </Link>

            <Link
              className={styles.channelName}
              href={`${Routes.twitch.channel}/${userData.id}`}
              data-testid="channelLink"
            >
              {userData.displayName}
            </Link>
            {isAuthenticated && (
              <SaveChannelButton channelId={userData.id} platform="twitch" />
            )}
          </div>
        </div>
        <div className={styles.rightContainer}>
          <Link className={styles.twitchLink} href={videoData.url}>
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
                onChange={toggleControls}
              />
              <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
          </div>
        </div>
      </section>
    </div>
  );
};
