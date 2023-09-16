import { render, screen } from "@testing-library/react";
import { YouTubeChannelPage } from "features/channels";
import { YouTubeChannelSearchResult } from "types/youtubeAPITypes";

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
  it.todo("Shows the channel title");

  it.todo("Shows the channel data (subscriber count and video count)");

  it.todo("Shows the channel thumbnail and banner");
});

describe("Channel page UI states", () => {
  it.todo("Renders data correctly (no loaders/error UI present)");

  it.todo("Renders only loading UI while data is loading");

  it.todo("Renders only error message when an API error occurs");

  it.todo(
    'Shows a "channel not found" message when no channel data is returned"'
  );
});
