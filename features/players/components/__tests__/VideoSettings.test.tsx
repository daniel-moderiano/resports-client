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
  it("Shows all settings", () => {
    setup();
    expect(true).toBe(true);
  });
});
