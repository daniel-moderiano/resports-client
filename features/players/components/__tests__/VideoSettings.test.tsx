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
    const subtitleSettings = screen.getByRole("menuitem", {
      name: /subtitles/i,
    });
    expect(qualitySettings).toBeInTheDocument();
    expect(subtitleSettings).toBeInTheDocument();
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
    const subtitleSettings = screen.getByRole("menuitem", {
      name: /subtitles/i,
    });
    expect(qualitySettings).not.toBeInTheDocument();
    expect(subtitleSettings).toBeInTheDocument();
    expect(speedSettings).toBeInTheDocument();
  });
});
