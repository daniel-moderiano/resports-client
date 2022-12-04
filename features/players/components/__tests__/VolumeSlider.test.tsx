import { render, screen } from "@testing-library/react";
import { VolumeSlider } from "features/players/components/video-controls/VolumeSlider";

describe("Volume slider", () => {
  it("Shows volume slider", () => {
    render(<VolumeSlider />);
  });
});
