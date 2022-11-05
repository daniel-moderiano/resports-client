import { render, screen } from "@testing-library/react";
import YouTubeSearchTab from "../../components/YouTubeSearchTab";
import { YouTubeSearchListResponse } from "types/youtubeAPITypes";

interface mockYouTubeSearchHook {
  isLoading: boolean;
  isError: boolean;
  data: YouTubeSearchListResponse | undefined;
  error: unknown;
}

// Provides two example YouTube channel results in the correct API format
const testData = {
  kind: "youtube#searchListResponse",
  etag: "lWVZc5USbrxXlJdsB9Zv2nAgmCk",
  nextPageToken: "CBkQAA",
  regionCode: "AU",
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 25,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "CHYY7VlBkyJiSXtbGbyn9k5LTA0",
      id: {
        kind: "youtube#channel",
        channelId: "UC6zzlBIwNS9GJZZ3rBx_WhQ",
      },
      snippet: {
        publishedAt: "2020-07-25T21:28:02Z",
        channelId: "UC6zzlBIwNS9GJZZ3rBx_WhQ",
        title: "Hudson's Playground Gaming",
        description:
          "Hudson's Playground Gaming is a channel me and Hudson decided to make featuring family friendly gaming! We will play farming ...",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLRerYD1Y1v2FFTpBa_vSsjto8CebOgshjA78hN0=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "Hudson's Playground Gaming",
        liveBroadcastContent: "upcoming",
        publishTime: "2020-07-25T21:28:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "_8PMvFXEjIvgjkSMLg0YC3dP7dw",
      id: {
        kind: "youtube#channel",
        channelId: "UCIPPMRA040LQr5QPyJEbmXA",
      },
      snippet: {
        publishedAt: "2020-04-07T18:46:13Z",
        channelId: "UCIPPMRA040LQr5QPyJEbmXA",
        title: "MrBeast Gaming",
        description: "MrBeast Gaming - SUBSCRIBE OR ELSE.",
        thumbnails: {
          default: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s88-c-k-c0xffffffff-no-rj-mo",
          },
          medium: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s240-c-k-c0xffffffff-no-rj-mo",
          },
          high: {
            url: "https://yt3.ggpht.com/ytc/AKedOLSg4oAq1Fk3S0C3J7InJOspNGSB3_-USBu3gS8iLg=s800-c-k-c0xffffffff-no-rj-mo",
          },
        },
        channelTitle: "MrBeast Gaming",
        liveBroadcastContent: "none",
        publishTime: "2020-04-07T18:46:13Z",
      },
    },
  ],
};

// Modify these parameters as needed within individual tests
const mockSearch: mockYouTubeSearchHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// This mock will produce whichever custom parameters are specified in the mockSearch object above
jest.mock("../../hooks/useYoutubeSearch", () => ({
  useYouTubeSearch: () => mockSearch,
}));

describe("YouTube search tab component", () => {
  it("Renders only loading UI while data is loading", () => {
    mockSearch.isLoading = true;
    render(<YouTubeSearchTab searchQuery="gaming" />);

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
    render(<YouTubeSearchTab searchQuery="gaming" />);

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
    render(<YouTubeSearchTab searchQuery="gaming" />);

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
    mockSearch.data = {
      kind: "youtube#searchListResponse",
      etag: "lWVZc5USbrxXlJdsB9Zv2nAgmCk",
      nextPageToken: "CBkQAA",
      regionCode: "AU",
      pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 25,
      },
      items: [],
    };
    render(<YouTubeSearchTab searchQuery="gaming" />);
    const test = screen.getByText(/no results/i);
    expect(test).toBeInTheDocument();
  });
});
