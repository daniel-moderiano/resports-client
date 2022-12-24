import { render, screen } from "@testing-library/react";
import { SearchBar } from "features/search";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

// Global useRouter mock. You MUST define a new instance of a mockRouter in each individual test to avoid checking against the global mockRouter (which does not reset between tests)
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Search bar UI and select options", () => {
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

  it("disables search buttons when search query is empty", () => {
    render(<SearchBar />);
    const buttons: HTMLButtonElement[] = screen.getAllByRole("button", {
      name: /search/i,
    });
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("disabled");
    });
  });

  it("disables search buttons when search query is whitespace only", async () => {
    render(<SearchBar />);
    const buttons: HTMLButtonElement[] = screen.getAllByRole("button", {
      name: /search/i,
    });

    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "   ");
    buttons.forEach((button) => {
      expect(button).toHaveAttribute("disabled");
    });
  });

  it("enables search buttons when search query is valid (non-whitespace)", async () => {
    render(<SearchBar />);
    const buttons: HTMLButtonElement[] = screen.getAllByRole("button", {
      name: /search/i,
    });
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    await userEvent.type(input, "hello");
    buttons.forEach((button) => {
      expect(button).not.toHaveAttribute("disabled");
    });
  });

  it("Sets container-wide styles when the input is focused", async () => {
    render(<SearchBar />);
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    const container: HTMLFormElement = screen.getByRole("search");
    expect(container).not.toHaveClass("active");

    await userEvent.click(input);

    expect(container).toHaveClass("active");
  });
});

describe("Search bar functionality", () => {
  it("routes to search page with correct search, using selected platform", async () => {
    const mockRouter = {
      push: jest.fn(),
      pathname: "",
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<SearchBar />);
    const btn: HTMLButtonElement = screen.getByRole("button", {
      name: /search/i,
    });
    const input: HTMLInputElement =
      screen.getByPlaceholderText(/search channels/i);
    const select: HTMLSelectElement = screen.getByRole("combobox");

    // Select the YouTube option in select dropdown menu
    await userEvent.click(select);
    const option = screen.getByText("YouTube");
    userEvent.click(option);

    // Perform the search
    await userEvent.type(input, "hello");
    await userEvent.click(btn);

    expect(mockRouter.push).toHaveBeenCalledWith({
      pathname: "/youtube/search",
      query: { term: "hello" },
    });
  });

  it("routes to search page with correct search term when Twitch search btn is pressed", async () => {
    const mockRouter = {
      push: jest.fn(),
      pathname: "",
    };
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
      pathname: "/twitch/search",
      query: { term: "hello" },
    });
  });

  it("Does not route to search page (i.e. submit search form) for empty searchQueries", async () => {
    const mockRouter = {
      push: jest.fn(),
      pathname: "",
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
