import { render, screen } from "@testing-library/react";
import { VolumeSlider } from "features/players/components/video-controls/VolumeSlider";

const playerMock = {
  getVolume: () => 50,
  setVolume: jest.fn,
};

describe("Volume slider", () => {
  it("Volume slider reflects current player volume", () => {
    render(
      <VolumeSlider
        // @ts-expect-error we do not require a full player mock for testing purposes
        player={playerMock}
      />
    );
    const slider = screen.getByLabelText("Volume");
    expect(slider).toHaveValue("50");
  });

  it("Volume slider hides when specified", () => {
    render(
      <VolumeSlider
        // @ts-expect-error we do not require a full player mock for testing purposes
        player={playerMock}
        showVolumeSlider={false}
      />
    );
    const slider = screen.getByTestId("slider");
    expect(slider).toHaveClass("hide");
  });
});
