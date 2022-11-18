import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoSettings } from "features/players";

const playerMock = {
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
  hasQualitySettings: () => true,
  hasPlaybackSpeedSettings: () => true,
  getPlaybackSpeed: () => 1,
  getAvailablePlaybackSpeeds: () => [1, 2],
  setPlaybackSpeed: jest.fn,
};

const setup = () => {
  render(
    <VideoSettings
      // @ts-expect-error we don't require most player methods for testing, so a partial implementation is fine
      player={playerMock}
      closeMenu={jest.fn}
    />
  );
};

describe("Video settings menu", () => {
  it("Shows all relevant settings where they are all available", () => {
    setup();
    const qualitySettings = screen.getByRole("menuitem", { name: /quality/i });
    const speedSettings = screen.getByRole("menuitem", {
      name: /playback speed/i,
    });
    expect(qualitySettings).toBeInTheDocument();
    expect(speedSettings).toBeInTheDocument();
  });

  it("Does not show settings that are not available for the video/platform", () => {
    playerMock.hasQualitySettings = () => false;
    setup();
    const qualitySettings = screen.queryByRole("menuitem", {
      name: /quality/i,
    });
    const speedSettings = screen.getByRole("menuitem", {
      name: /playback speed/i,
    });
    expect(qualitySettings).not.toBeInTheDocument();
    expect(speedSettings).toBeInTheDocument();
  });

  it("Hides all sub-menus by default", () => {
    setup();
    const auto = screen.queryByRole("menuitem", { name: /auto/i });
    const one = screen.queryByRole("menuitem", { name: /1/i });
    expect(one).not.toBeInTheDocument();
    expect(auto).not.toBeInTheDocument();
  });

  it("Shows qualities submenu with all options when clicking quality settings button", async () => {
    playerMock.hasQualitySettings = () => true;
    setup();
    const qualityButton = screen.getByRole("menuitem", { name: /quality/i });
    await userEvent.click(qualityButton);
    const auto = screen.getByText(/auto/i);
    const hd720 = screen.getByText(/720p/i);
    const hd1080 = screen.getByText(/1080p/i);
    expect(auto).toBeInTheDocument();
    expect(hd720).toBeInTheDocument();
    expect(hd1080).toBeInTheDocument();
  });

  it("Shows playback speed submenu with all options when clicking playback settings button", async () => {
    setup();
    const playbackSpeedButton = screen.getByRole("menuitem", {
      name: /playback/i,
    });
    await userEvent.click(playbackSpeedButton);
    const one = screen.getByText(/1/i);
    const two = screen.getByText(/2/i);
    expect(one).toBeInTheDocument();
    expect(two).toBeInTheDocument();
  });
});
