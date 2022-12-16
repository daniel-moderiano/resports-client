import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "features/players/components/styles/TwitchVideoDetails.module.css";

interface TwitchVideoDetailsProps {
  videoId: string;
}

export const TwitchVideoDetails = ({ videoId }: TwitchVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <>
      {data && (
        <section className={styles.container}>
          <h2 className={styles.videoTitle}>{data.videoData.title}</h2>
          <div className={styles.metricsContainer}>
            <p className={styles.uploadedDate}>
              Uploaded {data.videoData.creationDate.toLocaleDateString()}
            </p>
            <span>|</span>
            <p className={styles.views}>{data.videoData.views} views</p>
          </div>
          <div className={styles.channelContainer}>
            <Image
              alt={`${data.userData.displayName} thumbnail`}
              src={data.userData.profilePictureUrl}
              width={65}
              height={65}
              className={styles.channelThumbnail}
            />
            <span className={styles.channelName}>
              {data.userData.displayName}
            </span>
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
        </section>
      )}
    </>
  );
};
