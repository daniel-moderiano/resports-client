import { render, screen } from "@testing-library/react";
import { SeekIndicator } from "../SeekIndicator";

describe("Volume level indicator UI", () => {
  it("Shows correct volume percentage", () => {
    render(<SeekIndicator projectedSeekInSeconds={5} />);
    const volumeLevel = screen.getByText("50%");
    expect(volumeLevel).toBeInTheDocument();
  });

  it("Has correct accessible description", () => {
    render(<SeekIndicator projectedSeekInSeconds={30} />);
    const volumeLabel = screen.getByLabelText("Volume level 50%");
    expect(volumeLabel).toBeInTheDocument();
  });
});
