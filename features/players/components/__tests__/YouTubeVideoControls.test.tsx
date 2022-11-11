import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeVideoControls } from "features/players";

// Named mocks to test player functions being called
const playerMock = {
  getCurrentTime: () => 1,
  isMuted: () => false,
  getVolume: jest.fn,
};

let playerPausedMock = false;
const toggleFullscreenMock = jest.fn();
const toggleTheaterMock = jest.fn();
const togglePlayMock = jest.fn();
const toggleMuteMock = jest.fn();
const skipForwardMock = jest.fn();
const skipBackwardMock = jest.fn();
let playerMutedMock = true;

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

describe("YouTube video controls icons and label toggles", () => {
  const setup = () => {
    render(
      <YouTubeVideoControls
        // @ts-expect-error a complete Player object is not required for these tests
        player={playerMock}
        playerPaused={playerPausedMock}
        playerMuted={playerMutedMock}
        toggleFullscreen={toggleFullscreenMock}
        togglePlay={togglePlayMock}
        toggleTheater={toggleTheaterMock}
        skipForward={skipForwardMock}
        skipBackward={skipBackwardMock}
        toggleMute={toggleMuteMock}
      />
    );
  };

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
  const setup = () => {
    render(
      <YouTubeVideoControls
        // @ts-expect-error a complete Player object is not required for these tests
        player={playerMock}
        playerPaused={playerPausedMock}
        playerMuted={playerMutedMock}
        toggleFullscreen={toggleFullscreenMock}
        togglePlay={togglePlayMock}
        toggleTheater={toggleTheaterMock}
        skipForward={skipForwardMock}
        skipBackward={skipBackwardMock}
        toggleMute={toggleMuteMock}
      />
    );
  };

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
    expect(toggleTheaterMock).toBeCalled();
  });

  it("Calls skip forward function with 1 minute equivalent input on forward 1 btn click", async () => {
    setup();
    const skipOne = screen.getByRole("button", {
      name: "Skip forward one minute",
    });
    await userEvent.click(skipOne);
    expect(skipForwardMock).toBeCalledWith(60);
  });

  it("Calls skip forward function with 5 minute equivalent input on forward 5 btn click", async () => {
    setup();
    const skipFive = screen.getByRole("button", {
      name: "Skip forward five minutes",
    });
    await userEvent.click(skipFive);
    expect(skipForwardMock).toBeCalledWith(300);
  });

  it("Calls skip forward function with 10 minute equivalent input on forward 10 btn click", async () => {
    setup();
    const skipTen = screen.getByRole("button", {
      name: "Skip forward ten minutes",
    });
    await userEvent.click(skipTen);
    expect(skipForwardMock).toBeCalledWith(600);
  });

  it("Calls skip backward function with 1 minute equivalent input on backward 1 btn click", async () => {
    setup();
    const skipOne = screen.getByRole("button", {
      name: "Skip backward one minute",
    });
    await userEvent.click(skipOne);
    expect(skipBackwardMock).toBeCalledWith(-60);
  });

  it("Calls skip backward function with 5 minute equivalent input on backward 5 btn click", async () => {
    setup();
    const skipFive = screen.getByRole("button", {
      name: "Skip backward five minutes",
    });
    await userEvent.click(skipFive);
    expect(skipBackwardMock).toBeCalledWith(-300);
  });

  it("Calls skip backward function with 10 minute equivalent input on backward 10 btn click", async () => {
    setup();
    const skipTen = screen.getByRole("button", {
      name: "Skip backward ten minutes",
    });
    await userEvent.click(skipTen);
    expect(skipBackwardMock).toBeCalledWith(-600);
  });
});
