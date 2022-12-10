import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "components/Layout";

describe("Header component", () => {
  it("contains banner accessibility role", () => {
    render(<Header toggleSidebar={jest.fn} showSidebar={false} />);

    const banner = screen.getByRole("banner");

    expect(banner).toBeInTheDocument();
  });

  it("contains navigation component", () => {
    render(<Header toggleSidebar={jest.fn} showSidebar={false} />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });

  it("calls toggle sidebar function when clicking sidebar toggle button", async () => {
    const toggleSidebar = jest.fn();
    render(<Header toggleSidebar={toggleSidebar} showSidebar={false} />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    expect(toggleSidebar).toBeCalledTimes(1);
  });
});
