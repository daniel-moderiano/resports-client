import { render, screen } from "@testing-library/react";
import { Sidebar } from "components/Layout";

describe("Sidebar component", () => {
  it("contains appropriate test-id", () => {
    render(<Sidebar />);

    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
