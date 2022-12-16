import { render, screen } from "@testing-library/react";

import { TwitchVideo } from "features/channels";
import { TwitchVideoDetails } from "features/players/components/video-details/TwitchVideoDetails";

const testData: TwitchVideo = {
  // @ts-expect-error exact class implementation not needed in these tests
  videoData: {
    description: "",
    duration: "5h0m0s",
    durationInSeconds: 18000,
    id: "1521027333",
    isPublic: true,
    language: "en",
    publishDate: new Date(),
    streamId: "40938585131",
    thumbnailUrl:
      "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/99f9e412e6c974e168ba_loserfruit_40938585131_1656826735//thumb/thumb0-%{width}x%{height}.jpg",
    title:
      "BEST GAMER EVER? !newvid FORTNITE THEN GETTING THAT FALL GUYS ACHIEVEMENT",
    type: "archive",
    url: "https://www.twitch.tv/videos/1521027333",
    userDisplayName: "Loserfruit",
    userId: "41245072",
    userName: "loserfruit",
    views: 54140,
    creationDate: new Date(),
  },
  // @ts-expect-error exact class implementation not needed in these tests
  userData: {
    broadcasterType: "partner",
    cacheKey: "41245072",
    creationDate: new Date(),
    description:
      '"The streamer to watch when no one else is live...." - Thomas Jefferson',
    displayName: "Loserfruit",
    id: "41245072",
    name: "loserfruit",
    offlinePlaceholderUrl: "https://exampleimage.com",
    profilePictureUrl: "https://exampleimage.com",
    type: "",
    views: 56617494,
  },
};

interface mockVideoQueryTypes {
  isLoading: boolean;
  isError: boolean;
  data: TwitchVideo | undefined;
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
jest.mock("features/players/hooks/useGetTwitchVideoDetails", () => ({
  useGetTwitchVideoDetails: () => mockVideoQuery,
}));

describe("Video detail rendering", () => {
  mockVideoQuery.data = testData;

  it("Includes video thumbnail", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();
  });

  it("Includes video name", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const name = screen.getByText(/BEST GAMER EVER/i);
    expect(name).toBeInTheDocument();
  });

  it("Includes video duration", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const duration = screen.getByText("5:00:00");
    expect(duration).toBeInTheDocument();
  });

  it("Includes upload time/date", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const duration = screen.getByText("just now");
    expect(duration).toBeInTheDocument();
  });

  it("Includes channel name", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const channelName = screen.getByText(/loserfruit/i);
    expect(channelName).toBeInTheDocument();
  });

  it("Includes player link", () => {
    render(<TwitchVideoDetails videoId={"1234"} />);
    const playerLink = screen.getByRole("link", { name: /view in player/i });
    expect(playerLink).toBeInTheDocument();
  });
});
