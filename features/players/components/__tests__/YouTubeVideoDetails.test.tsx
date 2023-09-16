import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeVideoDetails } from "features/players/components/video-details/YouTubeVideoDetails";
import { YouTubeVideoData } from "types/youtubeAPITypes";

const testData: YouTubeVideoData = {
  videoData: {
    kind: "youtube#video",
    etag: "lvZx1mDERuROES8etRGA8RQSrIY",
    id: "eBDki6E6Bsk",
    snippet: {
      publishedAt: new Date().toLocaleString(),
      channelId: "UC4-KglLgi2JMDiJLfteayGg",
      title: "How Well Do The Underdogs Know Poppt1?",
      description:
        "🎮 Underdogs Gaming: https://youtube.com/channel/UCkulZ0s7oFO3VpcOwcCzi7A\n🎤 Underdogs Podcast: https://www.youtube.com/channel/UCjEkl12ocBUHNlFZRlgQsmA\n🐤 Underdogs Twitter: https://twitter.com/UnderdogsGroup\n\n🐾 THE UNDERDOGS 🐾\n\nZack (Little Z)\n► https://www.youtube.com/c/LittleZubat\n► https://twitter.com/LittleZ\n► https://instagram.com/little.zt\n► https://tiktok.com/@little.zt\n\nPeter (HopCat)\n► https://youtube.com/c/HopCatSmash\n► https://twitch.tv/HopCat\n► https://twitter.com/HopCaterpie\n► https://instagram.com/pdwjumps\n\nJordan (Poppt1)\n► https://youtube.com/user/IPoppt1I\n► https://twitch.tv/MrPoppt1\n► https://twitter.com/MrPoppt1\n\nJackson (Director Cogger)\n► https://youtube.com/c/DirectorCogger\n► https://twitter.com/DirectorCogger\n► https://www.instagram.com/directorcogger\n\nEdited by Shluk:\nhttps://www.youtube.com/c/Shluk\n\n#Underdogs",
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
          "🎮 Underdogs Gaming: https://youtube.com/channel/UCkulZ0s7oFO3VpcOwcCzi7A\n🎤 Underdogs Podcast: https://www.youtube.com/channel/UCjEkl12ocBUHNlFZRlgQsmA\n🐤 Underdogs Twitter: https://twitter.com/UnderdogsGroup\n\n🐾 THE UNDERDOGS 🐾\n\nZack (Little Z)\n► https://www.youtube.com/c/LittleZubat\n► https://twitter.com/LittleZ\n► https://instagram.com/little.zt\n► https://tiktok.com/@little.zt\n\nPeter (HopCat)\n► https://youtube.com/c/HopCatSmash\n► https://twitch.tv/HopCat\n► https://twitter.com/HopCaterpie\n► https://instagram.com/pdwjumps\n\nJordan (Poppt1)\n► https://youtube.com/user/IPoppt1I\n► https://twitch.tv/MrPoppt1\n► https://twitter.com/MrPoppt1\n\nJackson (Director Cogger)\n► https://youtube.com/c/DirectorCogger\n► https://twitter.com/DirectorCogger\n► https://www.instagram.com/directorcogger\n\nEdited by Shluk:\nhttps://www.youtube.com/c/Shluk\n\n#Underdogs",
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

interface mockVideoQueryTypes {
  isLoading: boolean;
  isError: boolean;
  data: YouTubeVideoData | undefined;
  error: unknown;
}

// Modify these parameters as needed within individual tests
const mockVideoQuery: mockVideoQueryTypes = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("features/players/hooks/useGetYouTubeVideoDetails", () => ({
  useGetYouTubeVideoDetails: () => mockVideoQuery,
}));

describe("Video detail rendering", () => {
  mockVideoQuery.data = testData;

  it.todo("Includes channel thumbnail");

  it.todo("Includes video title");

  it.todo("Includes video views in compact format");

  it.todo("Includes uploaded section");

  it.todo("Includes channel name as link");

  it.todo("Includes save button");

  it.todo("Renders YT-enabled player link on default player details");

  it.todo("Renders default player link on YT-enabled player details");
});

describe("Control toggles", () => {
  it.todo("Calls toggle control function on toggle button click");

  it.todo(
    "Customises toggle button content when controls are enabled/disabled"
  );
});
