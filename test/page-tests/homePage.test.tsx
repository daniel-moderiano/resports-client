import { render, screen } from "@testing-library/react";
import Home from "pages";

describe("Home page", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /home/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
