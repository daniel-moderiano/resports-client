import { mockUseAuth0, mockUseAuth0ReturnValue } from "mocks/useAuth0.mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "components/Layout";

// Must mock router as child components use this
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: "/",
  }),
}));

mockUseAuth0();

describe("Nav component", () => {
  it.todo("calls toggle sidebar function when clicking sidebar toggle button");

  it("shows only log in and sign up buttons when user is not authenticated", async () => {
    mockUseAuth0ReturnValue({
      isAuthenticated: false,
      isLoading: false,
    });
    render(<Nav toggleSidebar={jest.fn} showSidebar={false} />);
    const loginBtn = screen.getByRole("button", { name: /log in/i });
    const signupBtn = screen.getByRole("button", { name: /sign up/i });
    const userMenu = screen.queryByRole("button", { name: /open/i });

    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
    expect(userMenu).not.toBeInTheDocument();
  });

  it("shows user menu button when user is logged in", async () => {
    mockUseAuth0ReturnValue({
      isAuthenticated: true,
      isLoading: false,
    });
    render(<Nav toggleSidebar={jest.fn} showSidebar={false} />);
    const loginBtn = screen.queryByRole("button", { name: /log in/i });
    const signupBtn = screen.queryByRole("button", { name: /sign up/i });
    const userMenu = screen.getByRole("button", { name: /open/i });

    expect(loginBtn).not.toBeInTheDocument();
    expect(signupBtn).not.toBeInTheDocument();
    expect(userMenu).toBeInTheDocument();
  });
});
