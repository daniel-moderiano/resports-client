import { fireEvent, render, screen } from "@testing-library/react";
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

  it("Volume slider hides by default", () => {
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

  it("Volume slider displays when showVoluemSlider prop is true", () => {
    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={jest.fn}
        signalUserActivity={jest.fn}
        playerMuted={false}
        localVolume={50}
        setLocalVolume={jest.fn}
        showVolumeSlider={true}
      />
    );
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("show");
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

  it("Volume active bar width reflects current volume level", () => {
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
    const slider = screen.getByTestId("activeBar");
    expect(slider).toHaveStyle("width: 50%");
  });

  it("Local player mute state is adjusted when the user changes volume to zero", () => {
    const setPlayerMuted = jest.fn();

    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={setPlayerMuted}
        signalUserActivity={jest.fn}
        playerMuted={false}
        localVolume={50}
        setLocalVolume={jest.fn}
      />
    );
    const slider = screen.getByLabelText("Volume");
    fireEvent.change(slider, { target: { value: "0" } });

    expect(setPlayerMuted).toHaveBeenCalledWith(true);
  });

  it("Sets the volume level when the range input is changed", () => {
    const setLocalVolume = jest.fn();

    render(
      <VolumeSlider
        player={playerMock}
        setPlayerMuted={jest.fn}
        signalUserActivity={jest.fn}
        playerMuted={false}
        localVolume={50}
        setLocalVolume={setLocalVolume}
      />
    );

    const slider = screen.getByLabelText("Volume");
    fireEvent.change(slider, { target: { value: "25" } });

    expect(setLocalVolume).toHaveBeenCalledWith(25);
  });
});
