import { render, screen } from "@testing-library/react";
import TwitchChannelPage from "../../pages/twitchChannel/[channelId]";
import { TwitchChannel } from "../../hooks/useGetTwitchChannel";
import { HelixChannel, HelixUser } from "@twurple/api/lib";

interface mockTwitchChannelSearchHook {
  isLoading: boolean;
  isError: boolean;
  data: TwitchChannel | undefined;
  error: unknown;
}

// Globally mock the next router and useRouter hook. This mock prevents an reference error when the component attempts to read the router.query object from useRouter
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({ query: { channelId: "1234" } })),
}));

// Reflects the exact type of channel data received from the API
const testChannelData: HelixChannel = {
  _client: {},
  // @ts-expect-error exact getBroadcaster implementation not needed in these tests
  getBroadcaster: jest.fn,
  // @ts-expect-error exact getGame implementation not needed in these tests
  getGame: jest.fn,
  displayName: "Loserfruit",
  gameId: "509658",
  gameName: "Just Chatting",
  id: "41245072",
  language: "en",
  name: "loserfruit",
};

const testUserData: HelixUser = {
  // @ts-expect-error exact _client implementation not needed in these tests
  _client: {},
  cacheKey: "41245072",
  creationDate: new Date(),
  broadcasterType: "partner",
  displayName: "Loserfruit",
  description:
    '"The streamer to watch when no one else is live...." - Thomas Jefferson',
  id: "41245072",
  name: "loserfruit",
  offlinePlaceholderUrl:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/6fc3eac808af1932-channel_offline_image-1920x1080.jpeg",
  profilePictureUrl:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
  type: "",
  views: 56617494,
};

// Data is combined in this way by the custom getChannel hook for twitch channel pages
const testCombinedData = {
  channelData: testChannelData,
  userData: testUserData,
  isLive: false,
};

// Modify these parameters as needed within individual tests
const mockChannelSearch: mockTwitchChannelSearchHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// Provide channel data and other UI states via this mock of the channel search API call
jest.mock("../../hooks/useGetTwitchChannel", () => ({
  useGetTwitchChannel: () => mockChannelSearch,
}));

// Provide generalised mock to avoid errors when the TwitchChannelVideos component renders
jest.mock("../../hooks/useGetTwitchVideos", () => ({
  useGetTwitchVideos: () => ({}),
}));

describe("Channel page layout and elements", () => {
  it("Shows the channel title", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = testCombinedData;
    render(<TwitchChannelPage channelId="1234" />);

    const title = screen.getByRole("heading", { name: /loserfruit/i });
    expect(title).toBeInTheDocument();
  });

  it("Shows the channel thumbnail and banner (if banner exists)", () => {
    render(<TwitchChannelPage channelId="1234" />);

    // With channel thumbnail and banner, we should see two images in this component
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });
});

describe("Channel page UI states", () => {
  it("Renders data correctly (no loaders/error UI present)", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = false;
    mockChannelSearch.data = testCombinedData;
    render(<TwitchChannelPage channelId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that API error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check that data has been rendered
    const channelData = screen.getByRole("heading", { name: /loserfruit/i });
    expect(channelData).toBeInTheDocument();
  });

  it("Renders only loading UI while data is loading", () => {
    mockChannelSearch.isError = false;
    mockChannelSearch.isLoading = true;
    mockChannelSearch.data = undefined;
    render(<TwitchChannelPage channelId="1234" />);

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
    render(<TwitchChannelPage channelId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check for error UI
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });
});
