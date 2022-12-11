import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Sidebar } from "components/Layout";

describe("Sidebar component", () => {
  it("contains appropriate test-id", () => {
    render(<Sidebar showSidebar={true} closeSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });

  it("sets the active class when the sidebar is shown", () => {
    render(<Sidebar showSidebar={true} closeSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("sidebarActive");
  });

  it("removes the active class when the sidebar is hidden", () => {
    render(<Sidebar showSidebar={false} closeSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).not.toHaveClass("sidebarActive");
  });

  it("closes the sidebar when close button is clicked", async () => {
    render(<Sidebar showSidebar={false} closeSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");
    const closeButton = screen.getByRole("button", { name: /close/i });

    await userEvent.click(closeButton);

    expect(sidebar).not.toHaveClass("sidebarActive");
  });
});
