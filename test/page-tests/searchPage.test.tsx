import { render, screen } from "@testing-library/react";
import Search from "pages/search";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

// Globally mock the next router and useRouter hook. This mock prevents an reference error when the component attempts to read the router.query object from useRouter
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

// Use this in individual tests to provide a custom searchQuery for the component/page to handle
const setSearchQuery = (query: Record<string, unknown>) => {
  (useRouter as jest.Mock).mockImplementation(() => ({ query }));
};

// Mock the use..X..Search hooks to avoid errors
jest.mock("features/search/hooks/useYoutubeSearch", () => ({
  useYouTubeSearch: () => ({
    isLoading: false,
    isError: false,
    data: undefined,
    error: false,
    isIdle: false,
  }),
}));

jest.mock("features/search/hooks/useTwitchSearch", () => ({
  useTwitchSearch: () => ({
    isLoading: false,
    isError: false,
    data: undefined,
    error: false,
    isIdle: false,
  }),
}));

describe("Search results page", () => {
  describe("Query handling", () => {
    it("Displays the normal tabbed search page for valid queries", () => {
      setSearchQuery({ searchQuery: "test" });
      render(<Search />);
      // These buttons will appear by default when a valid query is used
      const youtubeButton = screen.getByText(/search youtube/i);
      const twitchButton = screen.getByText(/search twitch/i);
      expect(youtubeButton).toBeInTheDocument();
      expect(twitchButton).toBeInTheDocument();
    });

    it("Displays an invalid query warning when the user delivers an invalid query", () => {
      setSearchQuery({ searchQuery: "    " });
      render(<Search />);
      // Ensure the default display is hidden
      const youtubeButton = screen.queryByText(/search youtube/i);
      const twitchButton = screen.queryByText(/search twitch/i);
      expect(youtubeButton).not.toBeInTheDocument();
      expect(twitchButton).not.toBeInTheDocument();
    });
  });

  describe("Tab switching logic", () => {
    it("Displays tab buttons for both platforms", () => {
      // Set valid search for this (and therefore subsequent) tests
      setSearchQuery({ searchQuery: "test" });
      render(<Search />);
      const youtubeButton = screen.getByText(/search youtube/i);
      const twitchButton = screen.getByText(/search twitch/i);
      expect(youtubeButton).toBeInTheDocument();
      expect(twitchButton).toBeInTheDocument();
    });

    it("Displays Twitch tab active by default", () => {
      render(<Search />);
      const twitchTab = screen.getByText(/twitch results/i);
      expect(twitchTab).toBeInTheDocument();
    });

    it("Hides YouTube tab by default", () => {
      render(<Search />);
      const youtubeTab = screen.queryByText(/youtube results/i);
      expect(youtubeTab).not.toBeInTheDocument();
    });

    it("Switches platform tabs when tab switcher is clicked", async () => {
      render(<Search />);
      const youtubeButton = screen.getByText(/search youtube/i);

      // Switch tabs here
      await userEvent.click(youtubeButton);
      const youtubeTab = screen.getByText(/youtube results/i);
      expect(youtubeTab).toBeInTheDocument();
    });
  });
});
