import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Player } from "features/players";
import { PlayerClass } from "features/players/types/playerTypes";
import { VideoPlayer } from "features/players";
import { fireEvent } from "@testing-library/react";

const playMock = jest.fn();
const pauseMock = jest.fn();
const seekMock = jest.fn();
const setVolumeMock = jest.fn();
const setMutedMock = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

const playerWrapperPlaying: PlayerClass = {
  getCurrentTime: () => 100,
  getMuted: () => true,
  setMuted: setMutedMock,
  isPaused: () => false,
  play: playMock,
  pause: pauseMock,
  seek: seekMock,
  setVolume: setVolumeMock,
  getVolume: () => {
    return 50;
  },
  addEventListener: jest.fn,
  hasQualitySettings: () => {
    return false;
  },
  setQuality: jest.fn,
  getQualities: () => {
    return [];
  },
  hasPlaybackSpeedSettings: () => true,
  getPlaybackSpeed: () => 1,
  getAvailablePlaybackSpeeds: () => [1],
  setPlaybackSpeed: jest.fn,
  getQuality: () => "auto",
};

const playerWrapperPaused: PlayerClass = {
  ...playerWrapperPlaying,
  isPaused: () => true,
};

const player = new Player(playerWrapperPlaying);

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(20000);

describe("Video player styling and modes", () => {
  it("Begins in normal (non-theater) mode", () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");
    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  it('Switches to theater mode on "t" key press', async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperTheater");
    expect(wrapper).not.toHaveClass("wrapperNormal");
  });

  it('Switches to normal mode on "t" subsequent key press', async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    await userEvent.keyboard("[KeyT]");
    await userEvent.keyboard("[KeyT]");

    expect(wrapper).toHaveClass("wrapperNormal");
    expect(wrapper).not.toHaveClass("wrapperTheater");
  });

  // * Testing fullscreen functionality is not only impossible without a valid iframe (with 'allowFullscreen'), but potentially redundant as it is an inbuilt browser API function

  it("Includes video overlay, controls, and controls gradient on initial render", () => {
    render(<VideoPlayer player={player} />);
    const gradient = screen.getByTestId("gradient");
    const overlay = screen.getByTestId("overlay");
    const customControls = screen.getByTestId("customControls");
    expect(gradient).toBeInTheDocument();
    expect(overlay).toBeInTheDocument();
    expect(customControls).toBeInTheDocument();
  });
});

describe("Video player control toggles", () => {
  it("Initialises video with custom controls", () => {
    render(<VideoPlayer player={player} />);
    const customControls = screen.getByTestId("customControls");
    expect(customControls).toBeInTheDocument();
  });

  it("Visually display custom controls on mute/unmute with keypress", async () => {
    render(<VideoPlayer player={player} />);
    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Shows gradient alongside custom controls", async () => {
    render(<VideoPlayer player={player} />);

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const customControls = screen.getByTestId("customControls");
    const gradient = screen.getByTestId("gradient");
    expect(customControls).not.toHaveClass("controlsHide");
    expect(gradient).not.toHaveClass("gradientHide");
  });
});

describe("Video player keyboard shortcuts", () => {
  it('Mutes/unmutes the video on "m" key press', async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("m");

    // The mock iframe hook sets the initial mute state to 'unmuted', hence the mute mock should be called
    expect(setMutedMock).toBeCalled();
  });

  it('Plays a paused video on "k" key press', async () => {
    const player = new Player(playerWrapperPaused);
    render(<VideoPlayer player={player} />);
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
    const player = new Player(playerWrapperPlaying);
    render(<VideoPlayer player={player} />);
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
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowUp]");
    await userEvent.keyboard("[ArrowDown]");

    expect(setVolumeMock).toBeCalledTimes(2);
  });

  it("Seeks forward on right arrow key press", async () => {
    render(<VideoPlayer player={player} />);
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
    render(<VideoPlayer player={player} />);
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

describe("Video player controls/user activity timers", () => {
  it("Hides custom controls 3 seconds after user activity is first registered", async () => {
    render(<VideoPlayer player={player} />);

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    // Wait for controls to fade. Act is called here because this line does note directly use React Testing Library, and is the line that involves several DOM elements changing/re-rendering. React recommends act() in these cases
    await act(async () => {
      await new Promise((res) => setTimeout(res, 3500));
    });

    const customControls = screen.getByTestId("customControls");
    expect(customControls).toHaveClass("controlsHide");
  });

  it("Shows controls on press of mute keyboard shortcut", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("m");

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Fades controls after some time following a mute keyboard shortcut", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("m");

    // Wait an appropriate amount of time > 3 s
    await act(async () => {
      await new Promise((res) => setTimeout(res, 3500));
    });

    const customControls = screen.getByTestId("customControls");
    expect(customControls).toHaveClass("controlsHide");

    // Also check the cursor/overlay disappears
    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveClass("overlayInactive");
  });

  it("Cancels original fade out timer when user is active within original fade out timer", async () => {
    render(<VideoPlayer player={player} />);

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    // Wait only 0.5 seconds before hovering again to re-trigger controls
    await act(async () => {
      await new Promise((res) => setTimeout(res, 1500));
    });

    await userEvent.hover(overlay);

    // Check during the period that the original timer would have ended
    await act(async () => {
      await new Promise((res) => setTimeout(res, 2000));
    });

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Resets fade out time when user is active during original fade out time", async () => {
    render(<VideoPlayer player={player} />);
    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    // Wait only 0.5 seconds before hovering again to re-trigger controls
    await act(async () => {
      await new Promise((res) => setTimeout(res, 500));
    });

    await userEvent.hover(overlay);

    // Wait a further 3 seconds for controls to disappear
    await act(async () => {
      await new Promise((res) => setTimeout(res, 3500));
    });

    const customControls = screen.getByTestId("customControls");
    expect(customControls).toHaveClass("controlsHide");
  });

  it("Resets fade out time when user tabs to a control via keyboard", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // Focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[Tab]");
    // await userEvent.keyboard("[Tab]");

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });
});

describe("Video player control indicators", () => {
  it("Shows control indicator when pausing/playing video with keyboard", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("k");

    const indicator = screen.getByRole("status");

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass("triggerAnimation");
  });

  it("Does not show control indicator when playing/pausing video with control", async () => {
    render(<VideoPlayer player={player} />);

    // First hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.hover(overlay);

    const playBtn = screen.getByLabelText(/pause video/i);
    await userEvent.click(playBtn);

    const indicator = screen.getByRole("status");
    expect(indicator).not.toHaveClass("triggerAnimation");
  });

  it("Shows control indicator when pausing/playing video by clicking on video overlay", async () => {
    render(<VideoPlayer player={player} />);

    // First hover the relevant div to trigger user activity/controls to show
    const overlay = screen.getByTestId("overlay");
    await userEvent.click(overlay);

    const indicator = screen.getByRole("status");

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveClass("triggerAnimation");
  });

  it("Shows volume indicator when adjusting volume via keyboard (ArrowUp)", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowDown]");

    const indicator = screen.getByText("95%");

    expect(indicator).toBeInTheDocument();
  });

  it("Volume indicator disappears after certain time", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowDown]");

    const indicator = screen.queryByText("95%");
    expect(indicator).toBeInTheDocument();

    await act(async () => {
      await new Promise((res) => setTimeout(res, 600));
    });

    expect(indicator).not.toBeInTheDocument();
  });

  it("Shows correct seek indicator when seeking with the keyboard", async () => {
    render(<VideoPlayer player={player} />);
    const wrapper = screen.getByTestId("wrapper");

    // First focus the wrapper to ensure the keypress is captured correctly
    wrapper.focus();
    await userEvent.keyboard("[ArrowRight]");

    const indicator = screen.getByText("10 seconds");
    expect(indicator).toBeInTheDocument();
  });
});

describe("Volume and muting control", () => {
  it("Player is unmuted automatically when the volume slider is set to a non-zero value", async () => {
    render(<VideoPlayer player={player} />);

    // Volume slider should be starting at zero
    const volumeSlider = screen.getByLabelText("Volume");
    expect(volumeSlider).toHaveValue("0");

    // Check the player is in muted state
    const unmuteButton = screen.getByLabelText("Unmute video");
    expect(unmuteButton).toBeInTheDocument();

    // Manually set the volume using the slider
    fireEvent.change(volumeSlider, { target: { value: 20 } });
    expect(volumeSlider).toHaveValue("20");

    // Check the player is now in unmuted state
    const muteButton = screen.getByLabelText("Mute video");
    expect(muteButton).toBeInTheDocument();
  });

  it("Keyboard interaction with volume slider changes volume in 5 unit steps", async () => {
    render(<VideoPlayer player={player} />);
    const slider = screen.getByLabelText("Volume");

    // Focus the slider
    await userEvent.click(slider);

    await userEvent.keyboard("[ArrowLeft]");
    expect(slider).toHaveValue("95");
  });
});
