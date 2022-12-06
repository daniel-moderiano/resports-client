import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Player } from "features/players/api/player";
import { VolumeSlider } from "features/players/components/video-controls/VolumeSlider";

// @ts-expect-error we do not require a full player mock for testing purposes
const playerMock: Player = {
  getVolume: () => 50,
  setVolume: jest.fn,
  getMuted: () => true,
};

describe("Volume slider", () => {
  it("Volume slider reflects current player volume", () => {
    playerMock.getMuted = () => false;
    render(<VolumeSlider player={playerMock} setPlayerMuted={jest.fn} />);
    const slider = screen.getByLabelText("Volume");
    expect(slider).toHaveValue("50");
  });

  it("Volume slider hides when specified", () => {
    render(<VolumeSlider player={playerMock} setPlayerMuted={jest.fn} />);
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("hide");
  });

  it("Keyboard interaction changes volume in 5 unit steps", async () => {
    render(<VolumeSlider player={playerMock} setPlayerMuted={jest.fn} />);
    const slider = screen.getByLabelText("Volume");

    // Focus the slider
    await userEvent.click(slider);

    await userEvent.keyboard("[ArrowRight]");
    expect(slider).toHaveValue("55");
  });

  it("Volume slider sets to zero when player is muted", () => {
    playerMock.getMuted = () => true;
    render(<VolumeSlider player={playerMock} setPlayerMuted={jest.fn} />);
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("hide");
  });
});
