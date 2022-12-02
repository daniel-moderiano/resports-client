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

  it("Renders forward facing classes for forward seek", () => {
    render(<SeekIndicator projectedSeekInSeconds={10} />);
    const indicator = screen.getByRole("status");
    const playIcons = screen.getAllByTestId("playIcon");

    expect(indicator).toHaveClass("seekForward");
    playIcons.forEach((icon) => {
      expect(icon).not.toHaveClass("iconBackward");
    });
  });

  it("Renders backward facing classes for backward seek", () => {
    render(<SeekIndicator projectedSeekInSeconds={-10} />);
    const indicator = screen.getByRole("status");
    const playIcons = screen.getAllByTestId("playIcon");

    expect(indicator).toHaveClass("seekBackward");
    playIcons.forEach((icon) => {
      expect(icon).toHaveClass("iconBackward");
    });
  });
});
