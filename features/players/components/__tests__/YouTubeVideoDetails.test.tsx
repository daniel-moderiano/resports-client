import { render, screen } from "@testing-library/react";
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

  it("Includes channel thumbnail", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();

    const link = screen.getByTestId("channelImageLink");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/youtube/channel/UC4-KglLgi2JMDiJLfteayGg"
    );
  });

  it("Includes video title", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const name = screen.getByText(/How Well Do The Underdogs Know Poppt1?/i);
    expect(name).toBeInTheDocument();
  });

  it("Includes video views in compact format", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const views = screen.getByText(/107k views/i);
    expect(views).toBeInTheDocument();
  });

  it("Includes uploaded section", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const uploaded = screen.getByText(/just now/i);
    expect(uploaded).toBeInTheDocument();
  });

  it("Includes channel name as link", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const channelName = screen.getByTestId("channelLink");
    expect(channelName).toBeInTheDocument();
    expect(channelName).toHaveAttribute(
      "href",
      "/youtube/channel/UC4-KglLgi2JMDiJLfteayGg"
    );
  });

  it("Includes save button", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeInTheDocument();
  });

  it("Renders YT-enabled player link on default player details", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={true} />);
    const link = screen.getByRole("link", { name: /custom player/i });
    expect(link).toBeInTheDocument();
  });

  it("Renders default player link on YT-enabled player details", () => {
    render(<YouTubeVideoDetails videoId={"1234"} defaultPlayer={false} />);
    const link = screen.getByRole("link", { name: /default player/i });
    expect(link).toBeInTheDocument();
  });
});
