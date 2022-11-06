import { render, screen } from "@testing-library/react";
import { HelixVideo } from "@twurple/api/lib";
import { TwitchVideoListing } from "features/channels";

const testData: HelixVideo = {
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
  // @ts-expect-error exact getUser implementation not needed in these tests
  getUser: jest.fn,
  getThumbnailUrl: jest.fn(() => "https://exampleimage.com"),
};

describe("Twitch video listing component", () => {
  // This tests for an available thumbnail via getThumbnailUrl
  it("Includes video thumbnail", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();
  });

  it("Includes video name", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const name = screen.getByText(/BEST GAMER EVER/i);
    expect(name).toBeInTheDocument();
  });

  it("Includes video duration", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const duration = screen.getByText("5:00:00");
    expect(duration).toBeInTheDocument();
  });

  it("Includes upload time/date", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const duration = screen.getByText("just now");
    expect(duration).toBeInTheDocument();
  });

  it("Includes channel name", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const channelName = screen.getByText(/loserfruit/i);
    expect(channelName).toBeInTheDocument();
  });

  it("Includes player link", () => {
    render(<TwitchVideoListing videoData={testData} />);
    const playerLink = screen.getByRole("link", { name: /view in player/i });
    expect(playerLink).toBeInTheDocument();
  });
});
