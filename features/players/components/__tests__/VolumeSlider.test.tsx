import { render, screen } from "@testing-library/react";
import { Player } from "features/players/api/player";
import { VolumeSlider } from "features/players/components/video-controls/VolumeSlider";

// @ts-expect-error we do not require a full player mock for testing purposes
const playerMock: Player = {
  setMuted: jest.fn,
};

describe("Volume slider", () => {
  it("Volume slider reflects current player volume", () => {
    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={jest.fn}
        signalUserActivity={jest.fn}
        playerMuted={false}
        localVolume={50}
        setLocalVolume={jest.fn}
      />
    );
    const slider = screen.getByLabelText("Volume");
    expect(slider).toHaveValue("50");
  });

  it("Volume slider hides when specified", () => {
    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={jest.fn}
        signalUserActivity={jest.fn}
        playerMuted={false}
        localVolume={50}
        setLocalVolume={jest.fn}
      />
    );
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("hide");
  });

  it("Volume slider sets to zero when player is muted", () => {
    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={jest.fn}
        signalUserActivity={jest.fn}
        playerMuted={true}
        localVolume={50}
        setLocalVolume={jest.fn}
      />
    );
    const slider = screen.getByLabelText("Volume");
    expect(slider).toHaveValue("0");
  });
});
