import { render, screen } from "@testing-library/react";
import TwitchSearchTab from "../../components/TwitchSearchTab";
import { HelixChannelSearchResult } from "@twurple/api/lib/api/helix/search/HelixChannelSearchResult";

interface mockTwitchSearchHook {
  isLoading: boolean;
  isError: boolean;
  data: HelixChannelSearchResult[] | undefined;
  error: unknown;
}

// Provides two example Twitch channel results in the correct API format
const testData: HelixChannelSearchResult[] = [
  {
    _client: {},
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
    // @ts-expect-error exact getGame implementation not needed in these tests
    getGame: jest.fn,
    // @ts-expect-error exact getTags implementation not needed in these tests
    getTags: jest.fn,
    displayName: "GamingCultureBR",
    gameId: "516575",
    gameName: "VALORANT",
    id: "526145854",
    isLive: true,
    language: "pt",
    name: "gamingculturebr",
    startDate: null,
    tagIds: [
      "1eba3cfe-51cc-460a-8259-bc8bb987f904",
      "39ee8140-901a-4762-bfca-8260dea1310f",
    ],
    thumbnailUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/439f1a09-4d67-4cb7-8c4f-a8d16e675705-profile_image-300x300.png",
  },
  {
    _client: {},
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
    // @ts-expect-error exact getGame implementation not needed in these tests
    getGame: jest.fn,
    // @ts-expect-error exact getTags implementation not needed in these tests
    getTags: jest.fn,
    displayName: "Loserfruit",
    gameId: "509658",
    gameName: "Just Chatting",
    id: "41245072",
    isLive: false,
    language: "en",
    name: "loserfruit",
    startDate: null,
    tagIds: [],
    thumbnailUrl:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
  },
];

// Modify these parameters as needed within individual tests
const mockSearch: mockTwitchSearchHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// This mock will produce whichever custom parameters are specified in the mockSearch object above
jest.mock("../../hooks/useTwitchSearch", () => ({
  useTwitchSearch: () => mockSearch,
}));

describe("Twitch search tab component", () => {
  it("Renders only loading UI while data is loading", () => {
    mockSearch.isLoading = true;
    render(<TwitchSearchTab searchQuery="gaming" />);

    // Check error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check for loading UI
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("Renders only error message when an API error occurs", () => {
    mockSearch.isError = true;
    mockSearch.isLoading = false;
    render(<TwitchSearchTab searchQuery="gaming" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check for error UI
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });

  it("Renders data correctly (no loaders/error UI present)", () => {
    mockSearch.isError = false;
    mockSearch.isLoading = false;
    mockSearch.data = testData;
    render(<TwitchSearchTab searchQuery="gaming" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that API error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check that invalid message UI is not present
    const invalid = screen.queryByText(/invalid/i);
    expect(invalid).not.toBeInTheDocument();

    // Check that data has been rendered
    const searchResults = screen.getAllByRole("img");
    expect(searchResults).toHaveLength(2);
  });

  it("Renders custom message for searches that return no results", () => {
    mockSearch.isError = false;
    mockSearch.isLoading = false;
    // This data does not contain any channel items
    mockSearch.data = [];
    render(<TwitchSearchTab searchQuery="gaming" />);
    const test = screen.getByText(/no results/i);
    expect(test).toBeInTheDocument();
  });
});
