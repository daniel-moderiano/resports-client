import { render, screen } from "@testing-library/react";
import { TwitchVideo } from "features/channels";
import { TwitchVideoDetailsOverlay } from "../video-details/TwitchVideoDetailsOverlay";

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

describe("Video details rendering", () => {
  it("Includes channel thumbnail", () => {
    render(<TwitchVideoDetailsOverlay videoDetails={testData} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();

    const link = screen.getByTestId("channelImageLink");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/twitch/channel/41245072");
  });

  it("Includes video title", () => {
    render(<TwitchVideoDetailsOverlay videoDetails={testData} />);
    const name = screen.getByText(/BEST GAMER EVER/i);
    expect(name).toBeInTheDocument();
  });
});
