import { render, screen } from "@testing-library/react";
import Header from "../../components/layout/Header";

describe("Header component", () => {
  it("contains banner accessibility role", () => {
    render(<Header />);

    const banner = screen.getByRole("banner");

    expect(banner).toBeInTheDocument();
  });

  it("contains navigation component", () => {
    render(<Header />);

    const nav = screen.getByRole("navigation");

    expect(nav).toBeInTheDocument();
  });
});
