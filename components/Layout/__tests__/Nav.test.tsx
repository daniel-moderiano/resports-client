import { render, screen } from "@testing-library/react";
import Nav from "../../components/layout/Nav";

describe("Nav component", () => {
  it("contains navigation accessiblity role", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
