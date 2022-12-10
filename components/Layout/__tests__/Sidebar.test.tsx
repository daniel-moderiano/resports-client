import { render, screen } from "@testing-library/react";
import { Sidebar } from "components/Layout";

describe("Sidebar component", () => {
  it("contains appropriate test-id", () => {
    render(<Sidebar showSidebar={true} toggleSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it("sets the active class when the sidebar is shown", () => {
    render(<Sidebar showSidebar={true} toggleSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("sidebarActive");
  });

  it("removes the active class when the sidebar is hidden", () => {
    render(<Sidebar showSidebar={false} toggleSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).not.toHaveClass("sidebarActive");
  });
});
