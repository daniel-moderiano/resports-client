import { render, screen } from "@testing-library/react";
import { SearchBar } from "features/search";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

// Global useRouter mock. You MUST define a new instance of a mockRouter in each individual test to avoid checking against the global mockRouter (which does not reset between tests)
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Search bar component", () => {
  it('Shows "search channels" placeholder by default', () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search channels/i);
    expect(input).toBeInTheDocument();
  });

  it("Updates input UI when user types text", async () => {
    render(<SearchBar />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "test");
    expect(input.value).toBe("test");
  });

  it("disables search btn when search query is empty", () => {
    render(<SearchBar />);
    const btn: HTMLButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    expect(btn).toHaveAttribute("disabled");
  });

  it("disables search btn when search query is whitespace only", async () => {
    render(<SearchBar />);
    const btn: HTMLButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "   ");
    expect(btn).toHaveAttribute("disabled");
  });

  it("enables search btn when search query is valid (non-whitespace)", async () => {
    render(<SearchBar />);
    const btn: HTMLButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "hello");
    expect(btn).not.toHaveAttribute("disabled");
  });

  it("routes to search page with correct searchQuery when search btn is pressed", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    // Written this way to avoid typescript errors with mock mistypings
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<SearchBar />);
    const btn: HTMLButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "hello");
    await userEvent.click(btn);
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/search",
      query: { searchQuery: "hello" },
    });
  });

  it("routes to search page with correct searchQuery when enter key is pressed", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<SearchBar />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "hello");
    await userEvent.keyboard("[Enter]");
    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/search",
      query: { searchQuery: "hello" },
    });
  });

  it("Does not route to search page (i.e. submit search form) for empty searchQueries", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<SearchBar />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "  ");
    await userEvent.keyboard("[Enter]");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
