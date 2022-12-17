import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeNativePlayer } from "features/players";

jest.mock("features/players/api/useYouTubeIframe", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useYouTubeIframe: () => ({
    player: {
      getCurrentTime: () => 100,
      getMuted: () => false,
      setMuted: jest.fn,
      isPaused: jest.fn,
      play: jest.fn,
      pause: jest.fn,
      seek: jest.fn,
      setVolume: jest.fn,
      getVolume: jest.fn,
      addEventListener: jest.fn,
      hasQualitySettings: jest.fn,
      getQuality: jest.fn,
    },
  }),
}));

describe("YouTube player control toggles", () => {
  it("Initialises video without custom controls", () => {
    render(<YouTubeNativePlayer videoId="1234" disableControls={true} />);
    const customControls = screen.queryByTestId("customControls");
    expect(customControls).not.toBeInTheDocument();
  });

  it("Initialises video with YT controls blocker in place", () => {
    render(<YouTubeNativePlayer videoId="1234" disableControls={true} />);
    const controlsBlocker = screen.getByTestId("controlsBlocker");
    expect(controlsBlocker).toBeInTheDocument();
  });

  it("Shows custom controls when enabled", async () => {
    render(<YouTubeNativePlayer videoId="1234" disableControls={false} />);
    const controlsBlocker = screen.queryByTestId("controlsBlocker");
    const customControls = screen.getByTestId("customControls");
    expect(controlsBlocker).not.toBeInTheDocument();
    expect(customControls).toBeInTheDocument();
  });

  it("Shows gradient alongside custom controls", async () => {
    render(<YouTubeNativePlayer videoId="1234" disableControls={false} />);

    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    const gradient = screen.getByTestId("gradient");
    expect(customControls).not.toHaveClass("controlsHide");
    expect(gradient).not.toHaveClass("gradientHide");
  });
});
