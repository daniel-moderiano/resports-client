import React from "react";
import Image from "next/image";
import styles from "features/players/components/styles/youtubeVideoDetails.module.css";
import Link from "next/link";
import { timeAgo } from "config/timeAgoFormatter";

import { useGetYouTubeVideoDetails } from "features/players/hooks/useGetYouTubeVideoDetails";

const testData = {
  videoData: {
    kind: "youtube#video",
    etag: "lvZx1mDERuROES8etRGA8RQSrIY",
    id: "eBDki6E6Bsk",
    snippet: {
      publishedAt: "2022-10-31T19:00:17Z",
      channelId: "UC4-KglLgi2JMDiJLfteayGg",
      title: "How Well Do The Underdogs Know Poppt1?",
      description:
        "🎮 Underdogs Gaming: https://youtube.com/channel/UCkulZ0s7oFO3VpcOwcCzi7A\n🎤 Underdogs Podcast: https://www.youtube.com/channel/UCjEkl12ocBUHNlFZRlgQsmA\n🐤 Underdogs Twitter: https://twitter.com/UnderdogsGroup\n\n🐾 THE UNDERDOGS 🐾\n\nZack (Little Z)\n► https://www.youtube.com/c/LittleZubat\n► https://twitter.com/LittleZ\n► https://instagram.com/little.zt\n► https://tiktok.com/@little.zt\n\nPeter (HopCat)\n► https://youtube.com/c/HopCatSmash\n► https://youtube.tv/HopCat\n► https://twitter.com/HopCaterpie\n► https://instagram.com/pdwjumps\n\nJordan (Poppt1)\n► https://youtube.com/user/IPoppt1I\n► https://youtube.tv/MrPoppt1\n► https://twitter.com/MrPoppt1\n\nJackson (Director Cogger)\n► https://youtube.com/c/DirectorCogger\n► https://twitter.com/DirectorCogger\n► https://www.instagram.com/directorcogger\n\nEdited by Shluk:\nhttps://www.youtube.com/c/Shluk\n\n#Underdogs",
      thumbnails: {
        default: {
          url: "https://i.ytimg.com/vi/eBDki6E6Bsk/default.jpg",
          width: 120,
          height: 90,
        },
        medium: {
          url: "https://i.ytimg.com/vi/eBDki6E6Bsk/mqdefault.jpg",
          width: 320,
          height: 180,
        },
        high: {
          url: "https://i.ytimg.com/vi/eBDki6E6Bsk/hqdefault.jpg",
          width: 480,
          height: 360,
        },
        standard: {
          url: "https://i.ytimg.com/vi/eBDki6E6Bsk/sddefault.jpg",
          width: 640,
          height: 480,
        },
        maxres: {
          url: "https://i.ytimg.com/vi/eBDki6E6Bsk/maxresdefault.jpg",
          width: 1280,
          height: 720,
        },
      },
      channelTitle: "Underdogs",
      categoryId: "22",
      liveBroadcastContent: "none",
      defaultLanguage: "en",
      localized: {
        title: "How Well Do The Underdogs Know Poppt1?",
        description:
          "🎮 Underdogs Gaming: https://youtube.com/channel/UCkulZ0s7oFO3VpcOwcCzi7A\n🎤 Underdogs Podcast: https://www.youtube.com/channel/UCjEkl12ocBUHNlFZRlgQsmA\n🐤 Underdogs Twitter: https://twitter.com/UnderdogsGroup\n\n🐾 THE UNDERDOGS 🐾\n\nZack (Little Z)\n► https://www.youtube.com/c/LittleZubat\n► https://twitter.com/LittleZ\n► https://instagram.com/little.zt\n► https://tiktok.com/@little.zt\n\nPeter (HopCat)\n► https://youtube.com/c/HopCatSmash\n► https://youtube.tv/HopCat\n► https://twitter.com/HopCaterpie\n► https://instagram.com/pdwjumps\n\nJordan (Poppt1)\n► https://youtube.com/user/IPoppt1I\n► https://youtube.tv/MrPoppt1\n► https://twitter.com/MrPoppt1\n\nJackson (Director Cogger)\n► https://youtube.com/c/DirectorCogger\n► https://twitter.com/DirectorCogger\n► https://www.instagram.com/directorcogger\n\nEdited by Shluk:\nhttps://www.youtube.com/c/Shluk\n\n#Underdogs",
      },
      defaultAudioLanguage: "en",
    },
    statistics: {
      viewCount: "107197",
      likeCount: "7936",
      favoriteCount: "0",
      commentCount: "357",
    },
  },
  channelData: {
    kind: "youtube#channel",
    etag: "_SDrMar6vIakjailZ95Dl7vl9eI",
    id: "UC4-KglLgi2JMDiJLfteayGg",
    snippet: {
      title: "Underdogs",
      description: "",
      customUrl: "@underdogs429",
      publishedAt: "2022-03-13T04:42:13.82613Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/ZfRrAgog_PTvmymWQiRRsCSalToOIMa4-4rgcPhtxUv4I4pOZchgPZk8nd0WMAd29lYtZ328cw=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88,
        },
        medium: {
          url: "https://yt3.ggpht.com/ZfRrAgog_PTvmymWQiRRsCSalToOIMa4-4rgcPhtxUv4I4pOZchgPZk8nd0WMAd29lYtZ328cw=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240,
        },
        high: {
          url: "https://yt3.ggpht.com/ZfRrAgog_PTvmymWQiRRsCSalToOIMa4-4rgcPhtxUv4I4pOZchgPZk8nd0WMAd29lYtZ328cw=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800,
        },
      },
      localized: {
        title: "Underdogs",
        description: "",
      },
      country: "AU",
    },
    statistics: {
      viewCount: "5601030",
      subscriberCount: "76500",
      hiddenSubscriberCount: false,
      videoCount: "37",
    },
  },
};

interface YouTubeVideoDetailsProps {
  videoId: string;
}

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export const YouTubeVideoDetails = ({ videoId }: YouTubeVideoDetailsProps) => {
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
                href={`/youtube/channel/${data.channelData.id}`}
                data-testid="channelImageLink"
                className={styles.imageLink}
              >
                <span className={styles.srOnly}>
                  {data.channelData.snippet.title}
                </span>
                <Image
                  alt={`${data.channelData.snippet.title} thumbnail`}
                  src={data.channelData.snippet.thumbnails.default.url}
                  width={55}
                  height={55}
                  className={styles.channelThumbnail}
                />
              </Link>

              <Link
                className={styles.channelName}
                href={`/youtube/channel/${data.channelData.id}`}
                data-testid="channelLink"
              >
                {data.channelData.snippet.title}
              </Link>
              <button className={styles.saveButton}>+ Save</button>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Link
              className={styles.youtubeLink}
              href={`https://www.youtube.com/watch?v=${data.videoData.id}`}
            >
              Watch on YouTube
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};
