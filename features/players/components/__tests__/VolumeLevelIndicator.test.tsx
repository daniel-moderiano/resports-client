import { VolumeLevelIndicator } from "../VolumeLevelIndicator";
import { render, screen } from "@testing-library/react";

describe("Volume level indicator UI", () => {
  it("Shows correct volume percentage", () => {
    render(<VolumeLevelIndicator currentVolume={0.5} />);
    const volumeLevel = screen.getByText("50%");
    expect(volumeLevel).toBeInTheDocument();
  });

  it("Has correct accessible description", () => {
    render(<VolumeLevelIndicator currentVolume={0.5} />);
    const volumeLabel = screen.getByLabelText("Volume level 50%");
    expect(volumeLabel).toBeInTheDocument();
  });
});
