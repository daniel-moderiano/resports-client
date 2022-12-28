import { render, screen } from "@testing-library/react";
import { Nav } from "components/Layout";

describe("Nav component", () => {
  it("contains navigation accessiblity role", () => {
    render(<Nav showSidebar={true} toggleSidebar={jest.fn} />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
