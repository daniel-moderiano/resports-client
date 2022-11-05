import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TwitchPlayer from "../../components/TwitchPlayer";

// Named mocks to test player functions being called
const playMock = jest.fn();
const pauseMock = jest.fn();
const seekMock = jest.fn();
const setVolumeMock = jest.fn();
const setMutedMock = jest.fn();
let isPausedMock: () => boolean;

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("../../hooks/useTwitchPlayer", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useTwitchPlayer: () => ({
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
    },
  }),
}));

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

describe("YouTube player styling and modes", () => {
  it("Begins in normal (non-theater) mode", () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  it('Switches to theater mode on "t" key press', async () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperTheater");
    expect(wrapper).not.toHaveClass("wrapperNormal");
  });

  it('Switches to normal mode on "t" subsequent key press', async () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");
    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  // * Testing fullscreen functionality is not only impossible without a valid iframe (with 'allowFullscreen'), but potentially redundant as it is an inbuilt browser API function

  it("Includes video overlay, controls, and controls gradient on initial render", () => {
    render(<TwitchPlayer videoId="1234" />);
    const gradient = screen.getByTestId("gradient");
    const overlay = screen.getByTestId("overlay");
    const customControls = screen.getByTestId("customControls");
    expect(gradient).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(customControls).toBeInTheDocument();
  });

  it("Overlay is disabled when disable toggle is used", async () => {
    render(<TwitchPlayer videoId="1234" />);
    const overlay = screen.getByTestId("overlay");
    const toggle = screen.getByRole("button", { name: /toggle/i });

    // Disable the overlay manually
    await userEvent.click(toggle);
    expect(overlay).toHaveClass("overlayDisabled");
  });
});

describe("YouTube player control toggles", () => {
  it("Initialises video with custom controls", () => {
    render(<TwitchPlayer videoId="1234" />);
    const customControls = screen.getByTestId("customControls");
    expect(customControls).toBeInTheDocument();
  });

  it("Visually display custom controls on mute/unmute with keypress", async () => {
    render(<TwitchPlayer videoId="1234" />);
    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Controls do not appear when disabled manually", async () => {
    render(<TwitchPlayer videoId="1234" />);
    const overlay = screen.getByTestId("overlay");
    const toggle = screen.getByRole("button", { name: /toggle/i });

    // Disable the controls manually
    await userEvent.click(toggle);
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    const gradient = screen.getByTestId("gradient");
    expect(customControls).toHaveClass("controlsDisabled");
    expect(gradient).toHaveClass("gradientHide");
  });

  it("Shows gradient alongside custom controls", async () => {
    render(<TwitchPlayer videoId="1234" />);

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
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("m");

    // The mock iframe hook sets the initial mute state to 'unmuted', hence the mute mock should be called
    expect(setMutedMock).toBeCalled();
  });

  it('Plays a paused video on "k" key press', async () => {
    isPausedMock = () => true; // 'pause' the video
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("k");

    // Allow time for the timeout to expire before playing video
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    expect(playMock).toBeCalled();
  });

  it('Pauses a playing video on "k" key press', async () => {
    isPausedMock = () => false; // 'play' the video
    render(<TwitchPlayer videoId="1234" />);
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

  it("Adjusts volume on up/down arrow press", async () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowUp]");
    await userEvent.keyboard("[ArrowDown]");

    expect(setVolumeMock).toBeCalledTimes(2);
  });

  it("Seeks forward on right arrow key press", async () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowRight]");

    // Allow time for the seek timeouts
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });

    expect(seekMock).toBeCalled();
  });

  it("Seeks backward on left arrow key press", async () => {
    render(<TwitchPlayer videoId="1234" />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowLeft]");

    // Allow time for the seek timeouts
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1000));
    });

    expect(seekMock).toBeCalled();
  });
});
