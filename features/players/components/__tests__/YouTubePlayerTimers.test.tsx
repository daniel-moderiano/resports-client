import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubePlayer } from "features/players";
import { act } from "react-dom/test-utils";

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("features/players/api/useYouTubeIframe", () => ({
  // Make sure a player object is returned here to trigger the functions requiring a truthy player object
  useYouTubeIframe: () => ({
    player: {
      getCurrentTime: () => 0,
      isMuted: jest.fn,
      mute: jest.fn,
      unMute: jest.fn,
      getPlayerState: jest.fn,
      addEventListener: jest.fn,
    },
  }),
}));

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

describe("YouTube player controls/user activity timers", () => {
  it("Hides custom controls 3 seconds after user activity is first registered", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    await userEvent.click(hideYTBtn);
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
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
    wrapper.focus();
    await userEvent.keyboard("m");

    const customControls = screen.getByTestId("customControls");
    expect(customControls).not.toHaveClass("controlsHide");
  });

  it("Fades controls after some time following a mute keyboard shortcut", async () => {
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });
    const wrapper = screen.getByTestId("wrapper");

    // First enable custom controls, then focus the wrapper to ensure the keypress is captured correctly
    await userEvent.click(hideYTBtn);
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
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    await userEvent.click(hideYTBtn);
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
    render(<YouTubePlayer videoId="1234" />);
    const hideYTBtn = screen.getByRole("button", { name: /hide YT controls/i });

    // First enable custom controls, then hover the relevant div to trigger user activity/controls to show
    await userEvent.click(hideYTBtn);
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
});
