import { render, screen } from "@testing-library/react";
import { SeekIndicator } from "../SeekIndicator";

describe("Seek indicator UI", () => {
  it("Shows converted seek number", () => {
    render(<SeekIndicator projectedSeekInSeconds={10} />);
    const indicator = screen.getByText("10 seconds");
    expect(indicator).toBeInTheDocument();
  });

  it("Has correct accessible description for seeking forward", () => {
    render(<SeekIndicator projectedSeekInSeconds={10} />);
    const indicator = screen.getByLabelText("Skip forward 10 seconds");
    expect(indicator).toBeInTheDocument();
  });

  it("Has correct accessible description for seeking backward", () => {
    render(<SeekIndicator projectedSeekInSeconds={-10} />);
    const indicator = screen.getByLabelText("Skip backward 10 seconds");
    expect(indicator).toBeInTheDocument();
  });

  it("Renders right side indicator and facing icon for forward seek", () => {
    render(<SeekIndicator projectedSeekInSeconds={10} />);
    const indicator = screen.getByRole("status");
    expect(indicator).toHaveClass("seekForward");
  });

  it("Renders left side indicator and facing icon for backward seek", () => {
    render(<SeekIndicator projectedSeekInSeconds={-10} />);
    const indicator = screen.getByRole("status");
    expect(indicator).toHaveClass("seekBackward");
  });
});
