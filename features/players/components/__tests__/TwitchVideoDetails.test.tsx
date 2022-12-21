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
  it("Includes channel thumbnail", () => {
    setup();
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();

    const link = screen.getByTestId("channelImageLink");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/twitch/channel/41245072");
  });

  it("Includes video title", () => {
    setup();
    const name = screen.getByText(/BEST GAMER EVER/i);
    expect(name).toBeInTheDocument();
  });

  it("Includes video views in compact format", () => {
    setup();
    const views = screen.getByText(/54k views/i);
    expect(views).toBeInTheDocument();
  });

  it("Includes uploaded section", () => {
    setup();
    const uploaded = screen.getByText(/just now/i);
    expect(uploaded).toBeInTheDocument();
  });

  it("Includes channel name as link", () => {
    setup();
    const channelName = screen.getByTestId("channelLink");
    expect(channelName).toBeInTheDocument();
    expect(channelName).toHaveAttribute("href", "/twitch/channel/41245072");
  });

  it("Includes save button", () => {
    setup();
    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeInTheDocument();
  });
});

describe("Control toggles", () => {
  it("Calls toggle control function on toggle button click", async () => {
    const toggleMock = jest.fn();
    render(
      <TwitchVideoDetails
        videoDetails={testData}
        toggleControls={toggleMock}
        controlsDisabled={false}
      />
    );
    const toggleSwitch = screen.getByLabelText("Enable controls");
    await userEvent.click(toggleSwitch);
    expect(toggleMock).toBeCalledTimes(1);
  });

  it("Customises toggle button content when controls are enabled/disabled", async () => {
    const toggleMock = jest.fn();
    render(
      <TwitchVideoDetails
        videoDetails={testData}
        toggleControls={toggleMock}
        controlsDisabled={true}
      />
    );
    const toggleSwitch = screen.getByLabelText("Enable controls");
    expect(toggleSwitch).not.toBeChecked();
  });
});
