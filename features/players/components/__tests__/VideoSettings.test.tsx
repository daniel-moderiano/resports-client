import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoSettings } from "features/players";

// Named mocks to test player functions being called
const hasQualitySettingsMock = () => true;

const playerMock = {
  getCurrentTime: () => 1,
  isMuted: () => false,
  getVolume: jest.fn,
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
  hasQualitySettings: hasQualitySettingsMock,
};

// The max test timeout should be increase to deal with waiting for timeout intervals in certain tests
jest.setTimeout(10000);

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
    const qualitySettings = screen.getByRole("button", { name: /quality/ });
    const speedSettings = screen.getByRole("button", {
      name: /playback speed/,
    });
    const subtitleSettings = screen.getByRole("button", {
      name: /playback speed/,
    });
    expect(qualitySettings).toBeInTheDocument();
    expect(subtitleSettings).toBeInTheDocument();
    expect(speedSettings).toBeInTheDocument();
  });

  it("Does not show settings that are not available for the video/platform", () => {
    // TODO: Use different mock settings here for a YT replica
    setup();
    const qualitySettings = screen.queryByRole("button", { name: /quality/ });
    const speedSettings = screen.getByRole("button", {
      name: /playback speed/,
    });
    const subtitleSettings = screen.getByRole("button", {
      name: /playback speed/,
    });
    expect(qualitySettings).not.toBeInTheDocument();
    expect(subtitleSettings).toBeInTheDocument();
    expect(speedSettings).toBeInTheDocument();
  });
});
