import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

const setup = () => {
  render(
    <TwitchVideoDetails
      videoDetails={testData}
      toggleControls={jest.fn}
      controlsDisabled={false}
    />
  );
};

describe("Video detail rendering", () => {
  it.todo("Includes channel thumbnail");

  it.todo("Includes video title");

  it.todo("Includes video views in compact format");

  it.todo("Includes uploaded section");

  it.todo("Includes channel name as link");

  it.todo("Includes save button");
});

describe("Control toggles", () => {
  it.todo("Calls toggle control function on toggle button click");

  it.todo(
    "Customises toggle button content when controls are enabled/disabled"
  );
});
