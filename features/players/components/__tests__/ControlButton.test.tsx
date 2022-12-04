import { render, screen } from "@testing-library/react";
import { ControlButton } from "features/players/components/video-controls/ControlButton";

describe("Button UI rendering states", () => {
  it("Shows correct tooltip text", () => {
    render(<ControlButton tooltipText="hello tooltip"></ControlButton>);
    const tooltip = screen.getByText("hello tooltip");
    expect(tooltip).toBeInTheDocument();
  });

  it("Hides tooltip if condition is met", () => {
    render(
      <ControlButton
        tooltipText="hello tooltip"
        hideTooltip={true}
      ></ControlButton>
    );
    const tooltip = screen.getByText("hello tooltip");
    expect(tooltip).toHaveClass("hide");
  });

  it("Aligns tooltip correctly", () => {
    render(
      <ControlButton
        tooltipText="hello tooltip"
        tooltipAlign="left"
      ></ControlButton>
    );
    const tooltip = screen.getByText("hello tooltip");
    expect(tooltip).toHaveClass("alignLeft");
  });
});
