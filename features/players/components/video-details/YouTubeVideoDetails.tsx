import React from "react";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";

import { useGetYouTubeVideoDetails } from "features/players/hooks/useGetYouTubeVideoDetails";
import YouTubeFullIcon from "icons/YouTubeFullIcon";
import SwitchPlayerIcon from "icons/SwitchPlayerIcon";
import { InfoTooltip } from "../youtube-player/InfoTooltip";
import { Routes } from "config/routes";
import { SaveChannelButton } from "features/players";

interface YouTubeVideoDetailsProps {
  videoId: string;
  defaultPlayer: boolean;
  toggleControls?: () => void;
  controlsDisabled?: boolean;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const YouTubeVideoDetails = ({
  videoId,
  defaultPlayer,
  toggleControls,
  controlsDisabled,
}: YouTubeVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetYouTubeVideoDetails(videoId);

  return (
    <div className={styles.outerContainer}>
      {data && (
        <section className={styles.innerContainer}>
          <div className={styles.videoDetails}>
            <h2 className={styles.videoTitle}>
              {data.videoData.snippet.title}
            </h2>

            <div className={styles.metricsContainer}>
              <div className={styles.bar}></div>
              <p>
                {timeAgo.format(new Date(data.videoData.snippet.publishedAt))}
              </p>
              <span className={styles.dot}>·</span>
              <p>
                {formatter.format(
                  parseInt(data.videoData.statistics.viewCount)
                )}{" "}
                views
              </p>
            </div>
            <div className={styles.channelContainer}>
              <Link
                href={`${Routes.youtube.channel}/${data.channelData.id}`}
                data-testid="channelImageLink"
                className={styles.imageLink}
              >
                <span className={styles.srOnly}>
                  {data.channelData.snippet.title}
                </span>
                <img
                  alt={`${data.channelData.snippet.title} thumbnail`}
                  src={data.channelData.snippet.thumbnails.default.url}
                  width={55}
                  height={55}
                  className={styles.channelThumbnail}
                />
              </Link>

              <Link
                className={styles.channelName}
                href={`${Routes.youtube.channel}/${data.channelData.id}`}
                data-testid="channelLink"
              >
                {data.channelData.snippet.title}
              </Link>
              <SaveChannelButton
                channelId={data.channelData.id}
                platform="youtube"
              />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Link
              className={styles.youtubeLink}
              href={`https://www.youtube.com/watch?v=${data.videoData.id}`}
            >
              Watch on
              <YouTubeFullIcon className={styles.youtubeIcon} />
            </Link>

            {defaultPlayer ? (
              <div className={styles.playerSwitchContainer}>
                <InfoTooltip
                  tooltipText="The default YouTube player uses Resports' player controls, but does not allow the user to change video quality. Switch to the custom player to use YouTube's naitve player controls, which allow for quality change."
                  ariaLabel="Show more information about the different YouTube video players"
                />
                <Link
                  href={`${Routes.youtube.video}/${videoId}/native-player`}
                  className={styles.playerSwitchLink}
                >
                  <SwitchPlayerIcon className={styles.switchIcon} />
                  Custom player
                </Link>
              </div>
            ) : (
              <>
                <div className={styles.playerSwitchContainer}>
                  <InfoTooltip
                    tooltipText="The default YouTube player uses Resports' player controls, but does not allow the user to change video quality. Switch to the custom player to use YouTube's naitve player controls, which allow for quality change."
                    ariaLabel="Show more information about the different YouTube video players"
                  />
                  <Link
                    href={`${Routes.youtube.video}/${videoId}`}
                    className={styles.playerSwitchLink}
                  >
                    <SwitchPlayerIcon className={styles.switchIcon} />
                    Default player
                  </Link>
                </div>
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
              </>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
