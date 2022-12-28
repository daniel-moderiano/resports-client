import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "components/Layout";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Nav component", () => {
  it("calls toggle sidebar function when clicking sidebar toggle button", async () => {
    const toggleSidebar = jest.fn();
    render(<Nav toggleSidebar={toggleSidebar} showSidebar={false} />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    expect(toggleSidebar).toBeCalledTimes(1);
  });
});
