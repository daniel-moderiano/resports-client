import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubePlayer } from "features/players";

// Named mocks to test player functions being called
const playMock = jest.fn();
const pauseMock = jest.fn();
const seekMock = jest.fn();
const setVolumeMock = jest.fn();
const setMutedMock = jest.fn();
let isPausedMock: () => boolean;

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("features/players/api/useYouTubeIframe", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useYouTubeIframe: () => ({
    player: {
      getCurrentTime: () => 100,
      getMuted: () => false,
      setMuted: setMutedMock,
      isPaused: isPausedMock,
      play: playMock,
      pause: pauseMock,
      seek: seekMock,
      setVolume: setVolumeMock,
      getVolume: jest.fn,
      addEventListener: jest.fn,
      hasQualitySettings: jest.fn,
    },
  }),
}));

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

describe("YouTube player control toggles", () => {
  it("Initialises video without custom controls", () => {
    render(<YouTubePlayer videoId="1234" />);
    const customControls = screen.queryByTestId("customControls");
    expect(customControls).not.toBeInTheDocument();
  });

  it("Initialises video without YT controls blocker in place", () => {
    render(<YouTubePlayer videoId="1234" />);
    const controlsBlocker = screen.getByTestId("controlsBlocker");
    expect(controlsBlocker).toBeInTheDocument();
  });

  it("Hides YT controls (and show custom controls) on respective button press", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // This should hide the YT controls blocker
    await userEvent.click(hideYTBtn);

    const controlsBlocker = screen.queryByTestId("controlsBlocker");
    const customControls = screen.getByTestId("customControls");
    expect(controlsBlocker).not.toBeInTheDocument();
    expect(customControls).toBeInTheDocument();
  });

  it("Toggles between custom vs YT controls on respective button press", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const showYTBtn = screen.getByRole("button", { name: /show YT controls/i });

    // This should hide and then show the YT controls blocker
    await userEvent.click(hideYTBtn);
    await userEvent.click(showYTBtn);

    const controlsBlocker = screen.getByTestId("controlsBlocker");
    const customControls = screen.queryByTestId("customControls");
    expect(controlsBlocker).toBeInTheDocument();
    expect(customControls).not.toBeInTheDocument();
  });

  it("Renders custom controls when hiding YT controls", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // This should enable custom controls
    await userEvent.click(hideYTBtn);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).toHaveClass("controls");
    expect(customControls).toBeInTheDocument();
  });

  it("Visually display custom controls on mute/unmute with keypress", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    await userEvent.click(hideYTBtn);
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Shows gradient alongside custom controls", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    await userEvent.click(hideYTBtn);
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    const gradient = screen.getByTestId("gradient");
    expect(customControls).not.toHaveClass("controlsHide");
    expect(gradient).not.toHaveClass("gradientHide");
  });
});
