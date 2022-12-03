import { render, screen } from "@testing-library/react";
import { ControlTooltip } from "features/players/components/ControlTooltip";

describe("Control tooltip text and UI", () => {
  it("Shows correct text", () => {
    render(<ControlTooltip text="Settings" />);
    const tooltip = screen.getByText("Settings");
    expect(tooltip).toBeInTheDocument();
  });
});
