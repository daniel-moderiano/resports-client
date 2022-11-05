import { render, screen } from "@testing-library/react";
import Footer from "../../components/layout/Footer";

describe("Footer component", () => {
  it("contains contentinfo accessibility role", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");

    expect(footer).toBeInTheDocument();
  });
});
