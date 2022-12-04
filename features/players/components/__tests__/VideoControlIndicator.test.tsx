import { render, screen } from "@testing-library/react";
import { VideoControlIndicator } from "features/players/components/video-controls/VideoControlIndicator";

describe("Control indicator rendering and prop handling", () => {
  it("Render correct icon passed in via props", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={false}
        ariaLabel="play"
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
        ariaLabel="play"
        controlAction="play"
      />
    );
    const accessibleElement = screen.getByLabelText("play");
    expect(accessibleElement).toBeInTheDocument();
  });

  it("Hides indicator when trigger animation is not required", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={false}
        ariaLabel="play"
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
        ariaLabel="play"
        controlAction="play"
      />
    );
    const indicator = screen.getByRole("status");
    expect(indicator).toHaveClass("triggerAnimation");
  });

  it("Avoid aria label for volume adjustments", () => {
    render(
      <VideoControlIndicator
        triggerAnimation={true}
        ariaLabel="volumeUp"
        controlAction="volumeUp"
      />
    );
    const indicator = screen.queryByLabelText("volumeUp");
    expect(indicator).not.toBeInTheDocument();
  });
});
