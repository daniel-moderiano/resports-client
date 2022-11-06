import { render, screen } from "@testing-library/react";
import YouTubeChannel from "pages/youtube-channel/[channelId]";
import { YouTubeChannelSearchResult } from "types/youtubeAPITypes";
import { useGetYouTubeChannel } from "features/channels/hooks/useGetYouTubeChannel";

interface mockYouTubeChannelSearchHook {
  isLoading: boolean;
  isError: boolean;
  data:
    | { channelData: YouTubeChannelSearchResult }
    | { channelData: null }
    | undefined;
  error: unknown;
}

// Globally mock the next router and useRouter hook. This mock prevents a reference error when the component attempts to read the router.query object from useRouter
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({ query: { channelId: "1234" } })),
}));

// Reflects the exact type of channel data received from the API
const testData = {
  channelData: {
    kind: "youtube#channel",
    etag: "8BLSIOr6__UmS4fz3_UtPnp8t20",
    id: "UCbLIqv9Puhyp9_ZjVtfOy7w",
    snippet: {
      title: "Call of Duty League",
      description: "The official YouTube channel of the Call of Duty League",
      customUrl: "codleague",
      publishedAt: "2012-12-20T21:06:20Z",
      thumbnails: {
        default: {
          url: "https://yt3.ggpht.com/ZIOjlEtmCQvCKb_q4NHJeky4x-GPCibjYhom3DRe--We3rIbpwVkvXYelJHu0TnTqfGlB4mEJw=s88-c-k-c0x00ffffff-no-rj",
          width: 88,
          height: 88,
        },
        medium: {
          url: "https://yt3.ggpht.com/ZIOjlEtmCQvCKb_q4NHJeky4x-GPCibjYhom3DRe--We3rIbpwVkvXYelJHu0TnTqfGlB4mEJw=s240-c-k-c0x00ffffff-no-rj",
          width: 240,
          height: 240,
        },
        high: {
          url: "https://yt3.ggpht.com/ZIOjlEtmCQvCKb_q4NHJeky4x-GPCibjYhom3DRe--We3rIbpwVkvXYelJHu0TnTqfGlB4mEJw=s800-c-k-c0x00ffffff-no-rj",
          width: 800,
          height: 800,
        },
      },
      localized: {
        title: "Call of Duty League",
        description: "The official YouTube channel of the Call of Duty League",
      },
      country: "US",
    },
    contentDetails: {
      relatedPlaylists: {
        likes: "",
        uploads: "UUbLIqv9Puhyp9_ZjVtfOy7w",
      },
    },
    statistics: {
      viewCount: "329688440",
      subscriberCount: "1600000",
      hiddenSubscriberCount: false,
      videoCount: "9431",
    },
    brandingSettings: {
      channel: {
        title: "Call of Duty League",
        description: "The official YouTube channel of the Call of Duty League",
        keywords:
          '"call of duty" "cod league" codleague "call of duty league" esports cdl "call of duty world league" cwl "cod pros" "competitive call of duty" "pro call of duty" "black ops cold war" "call of duty cold war" "cod esports"',
        trackingAnalyticsAccountId: "UA-50249600-135",
        unsubscribedTrailer: "XpKyxQtr0Vc",
        country: "US",
      },
      image: {
        bannerExternalUrl:
          "https://yt3.ggpht.com/1Eh4TseBolUAevE0tq-FJMtPJgh2QTT-UwwBSVKaLwSO5UmvA8XiQHw7dHQOenDgmB-E1x4l",
      },
    },
  },
};

// Modify these parameters as needed within individual tests
const mockChannelSearch: mockYouTubeChannelSearchHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("features/channels/hooks/useGetYouTubeChannel", () => ({
  useGetYouTubeChannel: () => mockChannelSearch,
}));

// Provide generalised mock to avoid errors when the YouTubeChannelVideos component renders
jest.mock("features/channels/hooks/useGetYouTubeVideos", () => ({
  useGetYouTubeVideos: () => ({}),
}));

describe("Channel page layout and elements", () => {
  it("Shows the channel title", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = testData;
    render(<YouTubeChannel channelId="1234" />);

    const title = screen.getByRole("heading", { name: /Call of Duty/i });
    expect(title).toBeInTheDocument();
  });

  it("Shows the channel data (subscriber count and video count)", () => {
    render(<YouTubeChannel channelId="1234" />);

    const subCount = screen.getByText(/1600000 subscribers/i);
    const videoCount = screen.getByText(/9431 videos/i);
    expect(subCount).toBeInTheDocument();
    expect(videoCount).toBeInTheDocument();
  });

  it("Shows the channel thumbnail and banner", () => {
    render(<YouTubeChannel channelId="1234" />);

    // With channel thumbnail and banner, we should see two images in this component
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});

describe("Channel page UI states", () => {
  it("Renders data correctly (no loaders/error UI present)", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = testData;
    render(<YouTubeChannel channelId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that API error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check that data has been rendered
    const channelData = screen.getByRole("heading", {
      name: /Call of Duty League/i,
    });
    expect(channelData).toBeInTheDocument();
  });

  it("Renders only loading UI while data is loading", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = true;
    mockChannelSearch.data = undefined;
    render(<YouTubeChannel channelId="1234" />);

    // Check error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check for loading UI
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("Renders only error message when an API error occurs", () => {
    mockChannelSearch.isError = true;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = undefined;
    render(<YouTubeChannel channelId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check for error UI
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });

  it('Shows a "channel not found" message when no channel data is returned"', () => {
    mockChannelSearch.isError = true;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = { channelData: null };
    render(<YouTubeChannel channelId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that error UI is not present
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();

    // Check that 'not found' message is shown
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
