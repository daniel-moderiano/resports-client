import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Layout } from "components/Layout";

describe("Layout component", () => {
  it("renders children elements", () => {
    render(
      <Layout>
        <h2>content</h2>
      </Layout>
    );

    const heading = screen.getByRole("heading", {
      name: /content/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("hides sidebar by default", () => {
    render(<Layout />);
    const sidebar = screen.queryByTestId("sidebar");
    expect(sidebar).not.toHaveClass("sidebarActive");
  });

  it("toggles sidebar on toggle button click", async () => {
    render(<Layout />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toHaveClass("sidebarActive");
  });

  it("toggles overlay when sidebar is opened", async () => {
    render(<Layout />);

    // Default to hidden overlay
    const overlay = screen.getByTestId("overlay");
    expect(overlay).not.toHaveClass("overlayActive");

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    expect(overlay).toHaveClass("overlayActive");
  });

  it("closes sidebar on Esc key press", async () => {
    render(<Layout />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    const sidebar = screen.queryByTestId("sidebar");
    expect(sidebar).toHaveClass("sidebarActive");

    await userEvent.keyboard("[Esc]");
    expect(sidebar).not.toHaveClass("sidebarActive");
  });

  it("closes sidebar on outside click (i.e. overlay click)", async () => {
    render(<Layout />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });

    await userEvent.click(toggleButton);

    const sidebar = screen.queryByTestId("sidebar");
    expect(sidebar).toHaveClass("sidebarActive");

    // An outside click
    const overlay = screen.getByTestId("overlay");
    await userEvent.click(overlay);

    expect(sidebar).not.toHaveClass("sidebarActive");
  });
});
