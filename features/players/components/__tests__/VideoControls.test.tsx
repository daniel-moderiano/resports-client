import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoControls } from "features/players";

// Named mocks to test player functions being called
const hasQualitySettingsMock = () => true;

const playerMock = {
  getCurrentTime: () => 1,
  isMuted: () => false,
  getVolume: jest.fn,
  getQualities: () => [
    {
      name: "Auto",
      level: "auto",
    },
    {
      name: "1080p60",
      level: "chunked",
    },
    {
      name: "720p60",
      level: "720p60",
    },
  ],
  setQuality: jest.fn,
  hasQualitySettings: hasQualitySettingsMock,
  hasPlaybackSpeedSettings: () => true,
  hasCaptionSettings: () => true,
  getPlaybackSpeed: () => 1,
  getAvailablePlaybackSpeeds: () => [0.5, 1, 2],
  setPlaybackSpeed: jest.fn,
};

let playerPausedMock = false;
const toggleFullscreenMock = jest.fn();
const toggleTheaterModeMock = jest.fn();
const togglePlayMock = jest.fn();
const toggleMuteMock = jest.fn();
const seekMock = jest.fn();
let playerMutedMock = true;
const projectedTime: number | null = null;

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

const setup = () => {
  render(
    <VideoControls
      // @ts-expect-error we don't require most player methods for testing, so a partial implementation is fine
      player={playerMock}
      playerPaused={playerPausedMock}
      playerMuted={playerMutedMock}
      toggleFullscreen={toggleFullscreenMock}
      togglePlay={togglePlayMock}
      toggleTheaterMode={toggleTheaterModeMock}
      seek={seekMock}
      toggleMute={toggleMuteMock}
      projectedTime={projectedTime}
    />
  );
};

describe("YouTube video controls icons and label toggles", () => {
  it("Shows correct pause icon and aria-label when video is playing", () => {
    playerPausedMock = false;
    setup();
    const pauseBtn = screen.getByRole("button", { name: "Pause video" });
    const pauseIcon = screen.getByTestId(/pauseIcon/i);
    expect(pauseBtn).toBeInTheDocument();
    expect(pauseIcon).toBeInTheDocument();
  });

  it("Shows correct play icon and aria-label when video is paused", () => {
    playerPausedMock = true;
    setup();
    const playBtn = screen.getByRole("button", { name: "Play video" });
    const playIcon = screen.getByTestId(/playIcon/i);
    expect(playBtn).toBeInTheDocument();
    expect(playIcon).toBeInTheDocument();
  });

  it("Shows correct volume icon and aria-label (mute video) when video is unmuted", () => {
    playerMutedMock = false; // unmute the videos
    setup();
    const muteBtn = screen.getByRole("button", { name: "Mute video" });
    const volumeIcon = screen.getByTestId(/volumeIcon/i);
    expect(muteBtn).toBeInTheDocument();
    expect(volumeIcon).toBeInTheDocument();
  });

  it("Shows correct muted icon and aria-label (unmute video) when video is muted", () => {
    playerMutedMock = true; // unmute the videos
    setup();
    const unMuteBtn = screen.getByRole("button", { name: "Unmute video" });
    const mutedIcon = screen.getByTestId(/mutedIcon/i);
    expect(unMuteBtn).toBeInTheDocument();
    expect(mutedIcon).toBeInTheDocument();
  });

  it("Shows correct enter fullscreen icon and aria-label on initial load", () => {
    setup();
    const enterFullscreenBtn = screen.getByRole("button", {
      name: "Enter fullscreen mode",
    });
    const enterFullscreenIcon = screen.getByTestId(/enterFullscreenIcon/i);
    expect(enterFullscreenBtn).toBeInTheDocument();
    expect(enterFullscreenIcon).toBeInTheDocument();
  });

  // It is impossible to mock entering fullscreen to test the toggle to exit fullscreen label/icon. Hence only entering is tested here.

  it("Shows elapsed duration on initial render (i.e. without 1 second delay)", () => {
    setup();
    const duration = screen.getByText("0:01");
    expect(duration).toBeInTheDocument();
  });
});

describe("YouTube video controls functionality", () => {
  it("Play button calls play/pause function on click", async () => {
    setup();
    const playBtn = screen.getByRole("button", { name: "Play video" });
    await userEvent.click(playBtn);
    expect(togglePlayMock).toBeCalled();
  });

  it("Pause button calls play/pause function on click", async () => {
    playerPausedMock = false; // "play" the video
    setup();
    const pauseBtn = screen.getByRole("button", { name: "Pause video" });
    await userEvent.click(pauseBtn);
    expect(togglePlayMock).toBeCalled();
  });

  it("Mute button calls mute toggle function on click", async () => {
    playerMutedMock = false;
    setup();
    const muteBtn = screen.getByRole("button", { name: "Mute video" });
    await userEvent.click(muteBtn);
    expect(toggleMuteMock).toBeCalled();
  });

  it("Unmute button calls mute toggle function on click", async () => {
    playerMutedMock = true;
    setup();
    const unMuteBtn = screen.getByRole("button", { name: "Unmute video" });
    await userEvent.click(unMuteBtn);
    expect(toggleMuteMock).toBeCalled();
  });

  it("Enter fullscreen button calls fullscreen toggle function on click", async () => {
    setup();
    const fullscreenBtn = screen.getByRole("button", {
      name: "Enter fullscreen mode",
    });
    await userEvent.click(fullscreenBtn);
    expect(toggleFullscreenMock).toBeCalled();
  });

  // * We cannot mock fullscreen, so testing the exit fullscreen btn is impossible

  it("Theater button calls theater toggle function on click", async () => {
    setup();
    const theaterBtn = screen.getByRole("button", {
      name: "Switch to theater mode",
    });
    await userEvent.click(theaterBtn);
    expect(toggleTheaterModeMock).toBeCalled();
  });

  it("Calls skip forward function with 1 minute equivalent input on forward 1 btn click", async () => {
    setup();
    const skipOne = screen.getByRole("button", {
      name: "Skip forward one minute",
    });
    await userEvent.click(skipOne);
    expect(seekMock).toBeCalledWith(60);
  });

  it("Calls skip forward function with 5 minute equivalent input on forward 5 btn click", async () => {
    setup();
    const skipFive = screen.getByRole("button", {
      name: "Skip forward five minutes",
    });
    await userEvent.click(skipFive);
    expect(seekMock).toBeCalledWith(300);
  });

  it("Calls skip forward function with 10 minute equivalent input on forward 10 btn click", async () => {
    setup();
    const skipTen = screen.getByRole("button", {
      name: "Skip forward ten minutes",
    });
    await userEvent.click(skipTen);
    expect(seekMock).toBeCalledWith(600);
  });

  it("Calls skip backward function with 1 minute equivalent input on backward 1 btn click", async () => {
    setup();
    const skipOne = screen.getByRole("button", {
      name: "Skip backward one minute",
    });
    await userEvent.click(skipOne);
    expect(seekMock).toBeCalledWith(-60);
  });

  it("Calls skip backward function with 5 minute equivalent input on backward 5 btn click", async () => {
    setup();
    const skipFive = screen.getByRole("button", {
      name: "Skip backward five minutes",
    });
    await userEvent.click(skipFive);
    expect(seekMock).toBeCalledWith(-300);
  });

  it("Calls skip backward function with 10 minute equivalent input on backward 10 btn click", async () => {
    setup();
    const skipTen = screen.getByRole("button", {
      name: "Skip backward ten minutes",
    });
    await userEvent.click(skipTen);
    expect(seekMock).toBeCalledWith(-600);
  });
});

describe("Settings menu display tests", () => {
  it("Hides settings menu by default", () => {
    setup();
    const menu = screen.queryByTestId("settingsMenu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Opens settings menu on click of settings btn if menu is currently closed", async () => {
    setup();
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    const menu = screen.queryByTestId("settingsMenu");
    expect(menu).toBeInTheDocument();
  });

  it("Closes menu when outside click occurs", async () => {
    setup();

    // Open menu
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    // Outside click by clicking on another control btn
    const theatreBtn = screen.getByRole("button", { name: /theater/i });
    await userEvent.click(theatreBtn);

    const menu = screen.queryByTestId("settingsMenu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when Esc key is pressed", async () => {
    setup();
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    await userEvent.keyboard("[Escape]");

    const menu = screen.queryByTestId("settingsMenu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Does not close menu when menu is clicked in a non-button area (e.g. menu background)", async () => {
    setup();
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    const menu = screen.getByTestId("settingsMenu");
    await userEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });

  it("Does not close settings menu when clicking primary menu button", async () => {
    setup();
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    const qualityButton = screen.getByRole("menuitem", { name: /quality/i });
    await userEvent.click(qualityButton);

    const menu = screen.getByTestId("settingsMenu");
    expect(menu).toBeInTheDocument();
  });

  it("Closes menu when clicking option within submenu", async () => {
    setup();
    const settingsBtn = screen.getByRole("button", {
      name: /open video settings menu/i,
    });
    await userEvent.click(settingsBtn);

    const qualityButton = screen.getByRole("menuitem", { name: /quality/i });
    await userEvent.click(qualityButton);

    const qualityOption = screen.getByRole("menuitem", { name: /1080p/i });
    await userEvent.click(qualityOption);

    const menu = screen.queryByTestId("settingsMenu");
    expect(menu).not.toBeInTheDocument();
  });
});
