import { render, screen } from "@testing-library/react";
import { Sidebar } from "components/Layout";

describe("Sidebar component", () => {
  it("contains appropriate test-id", () => {
    render(<Sidebar showSidebar={true} toggleSidebar={jest.fn} />);

    const sidebar = screen.getByTestId("sidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
