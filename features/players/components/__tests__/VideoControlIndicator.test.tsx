import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PauseIcon from "icons/PauseIcon";
import { VideoControlIndicator } from "../VideoControlIndicator";

describe("Control indicator rendering and prop handling", () => {
  it("Shows correct icon passed in via props", () => {
    render(
      <VideoControlIndicator
        fadeOut={false}
        ariaLabel="Pause"
        icon={<PauseIcon testId="pauseIndicator" />}
      />
    );
    const icon = screen.getByTestId(/pauseIndicator/i);
    expect(icon).toBeInTheDocument();
  });

  it("Has correct accessible name and role", () => {
    render(
      <VideoControlIndicator
        fadeOut={false}
        ariaLabel="Pause"
        icon={<PauseIcon />}
      />
    );
    const accessibleElement = screen.getByLabelText("Pause");
    expect(accessibleElement).toBeInTheDocument();
  });
});
