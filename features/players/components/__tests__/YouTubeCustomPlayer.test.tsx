import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeCustomPlayer } from "features/players";

// Named mocks to test player functions being called
const muteMock = jest.fn();
const unMuteMock = jest.fn();
const playMock = jest.fn();
const pauseMock = jest.fn();
const seekToMock = jest.fn();
const setVolumeMock = jest.fn();
let getPlayerStateMock: () => number;

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("features/players/api/useYouTubeIframe", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useYouTubeIframe: () => ({
    player: {
      getCurrentTime: () => 100,
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
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  it('Switches to theater mode on "t" key press', async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperTheater");
    expect(wrapper).not.toHaveClass("wrapperNormal");
  });

  it('Switches to normal mode on "t" subsequent key press', async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");
    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  // * Testing fullscreen functionality is not only impossible without a valid iframe (with 'allowFullscreen'), but potentially redundant as it is an inbuilt browser API function

  it("Includes video overlay, controls, and controls gradient on initial render", () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const gradient = screen.getByTestId("gradient");
    const overlay = screen.getByTestId("overlay");
    const customControls = screen.getByTestId("customControls");
    expect(gradient).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(customControls).toBeInTheDocument();
  });

  it("Shows clear overlay when the video is playing", async () => {
    getPlayerStateMock = () => 2; // 'pause' the video
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // Ensure the video is in a 'playing' state using key shortcuts
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
    getPlayerStateMock = () => 1; // 'play' the video
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
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
  it("Initialises video with custom controls", () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const customControls = screen.getByTestId("customControls");
    expect(customControls).toBeInTheDocument();
  });

  it("Visually display custom controls on mute/unmute with keypress", async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Shows gradient alongside custom controls", async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
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
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("m");

    // The mock iframe hook sets the initial mute state to 'unmuted', hence the mute mock should be called
    expect(muteMock).toBeCalled();
  });

  it('Plays a paused video on "k" key press', async () => {
    getPlayerStateMock = () => 2; // 'pause' the video
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
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
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(pauseMock).toBeCalled();
  });

  it('Plays a paused video on "k" key press', async () => {
    getPlayerStateMock = () => 2; // 'pause' the video
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[Space]");

    // Allow time for the timout to expire before playing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(playMock).toBeCalled();
  });

  it('Pauses a playing video on "k" key press', async () => {
    getPlayerStateMock = () => 1; // 'play' the video
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[Space]");

    // Allow time for the timout to expire before pausing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(pauseMock).toBeCalled();
  });

  it("Adjusts volume on up/down arrow press", async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowUp]");
    await userEvent.keyboard("[ArrowDown]");

    expect(setVolumeMock).toBeCalledTimes(2);
  });

  it("Seeks forward on right arrow key press", async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowRight]");

    // Allow time for the seek timeouts
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });

    expect(seekToMock).toBeCalled();
  });

  it("Seeks backward on left arrow key press", async () => {
    render(<YouTubeCustomPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowLeft]");

    // Allow time for the seek timeouts
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });

    expect(seekToMock).toBeCalled();
  });
});
