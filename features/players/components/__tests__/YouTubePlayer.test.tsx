import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubePlayer } from "features/players";

// Named mocks to test player functions being called
const muteMock = jest.fn();
const unMuteMock = jest.fn();
const playMock = jest.fn();
const pauseMock = jest.fn();
const seekToMock = jest.fn();
const setVolumeMock = jest.fn();
let getPlayerStateMock: () => number;

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("../../hooks/useYouTubeIframe", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useYouTubeIframe: () => ({
    player: {
      getCurrentTime: () => 100, // Ensure the skipBackward functions work as intended
      isMuted: () => false,
      mute: muteMock,
      unMute: unMuteMock,
      playVideo: playMock,
      pauseVideo: pauseMock,
      getPlayerState: getPlayerStateMock,
      seekTo: seekToMock,
      setVolume: setVolumeMock,
      getVolume: jest.fn,
    },
  }),
}));

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

describe("YouTube player styling and modes", () => {
  it("Begins in normal (non-theater) mode", () => {
    render(<YouTubePlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  it('Switches to theater mode on "t" key press', async () => {
    render(<YouTubePlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperTheater");
    expect(wrapper).not.toHaveClass("wrapperNormal");
  });

  it('Switches to normal mode on "t" subsequent key press', async () => {
    render(<YouTubePlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");
    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  // * Testing fullscreen functionality is not only impossible without a valid iframe (with 'allowFullscreen'), but potentially redundant as it is an inbuilt browser API function

  it("Hides controls gradient and video overlay by default", () => {
    render(<YouTubePlayer videoId="1234" />);
    const gradient = screen.queryByTestId("gradient");
    const overlay = screen.queryByTestId("overlay");
    expect(gradient).not.toBeInTheDocument();
    expect(overlay).not.toBeInTheDocument();
  });

  it("Shows clear overlay when the video is playing (custom mode)", async () => {
    getPlayerStateMock = () => 2; // 'play' the video
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // Ensure the video is in a 'playing' state using key shortcuts
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow for the timeout to expire before the playVideo func is called
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveClass("overlayPlaying");
  });

  it("Shows blocking overlay when the video is paused", async () => {
    getPlayerStateMock = () => 1; // 'pause' the video
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveClass("overlayPaused");
  });
});

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

  it("Renders custom controls hidden when hiding YT controls", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // This should enable custom controls
    await userEvent.click(hideYTBtn);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).toHaveClass("controlsHide");
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

describe("YouTube player keyboard shortcuts", () => {
  it('Mutes/unmutes the video on "m" key press', async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("m");

    // The mock iframe hook sets the initial mute state to 'unmuted', hence the mute mock should be called
    expect(muteMock).toBeCalled();
  });

  it('Plays a paused video on "k" key press', async () => {
    getPlayerStateMock = () => 2; // 'pause' the video
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow time for the timout to expire before playing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(playMock).toBeCalled();
  });

  it('Pauses a playing video on "k" key press', async () => {
    getPlayerStateMock = () => 1; // 'play' the video
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(pauseMock).toBeCalled();
  });

  it("Adjusts volume on up/down arrow press", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("[ArrowUp]");
    await userEvent.keyboard("[ArrowDown]");

    expect(setVolumeMock).toBeCalledTimes(2);
  });

  it("Seeks forward on right arrow key press", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();

    await userEvent.keyboard("[ArrowRight]");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });
    expect(seekToMock).toBeCalled();
  });

  it("Seeks backward on left arrow key press", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();

    await userEvent.keyboard("[ArrowLeft]");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });
    expect(seekToMock).toBeCalled();
  });
});
