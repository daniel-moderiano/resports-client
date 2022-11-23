import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VideoControlIndicator } from "../VideoControlIndicator";

describe("Control indicator rendering and prop handling", () => {
  it("Render correct icon passed in via props", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={false}
        ariaLabel="Play"
        controlAction="play"
      />
    );
    const icon = screen.getByTestId(/playIndicator/i);
    expect(icon).toBeInTheDocument();
  });

  it("Has correct accessible name and role", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={false}
        ariaLabel="Play"
        controlAction="play"
      />
    );
    const accessibleElement = screen.getByLabelText("Play");
    expect(accessibleElement).toBeInTheDocument();
  });

  it("Hides indicator when trigger animation is not required", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={false}
        ariaLabel="Play"
        controlAction="play"
      />
    );
    const indicator = screen.getByRole("status");
    expect(indicator).not.toHaveClass("triggerAnimation");
  });

  it("Shows indicator when trigger animation is required", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={true}
        ariaLabel="Play"
        controlAction="play"
      />
    );
    const indicator = screen.getByRole("status");
    expect(indicator).toHaveClass("triggerAnimation");
  });
});
