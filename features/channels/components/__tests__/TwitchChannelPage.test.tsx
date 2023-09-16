import { render, screen } from "@testing-library/react";
import { TwitchChannelPage } from "features/channels";
import { TwitchChannel } from "features/channels";
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
jest.mock("features/channels/hooks/useGetTwitchChannel", () => ({
  useGetTwitchChannel: () => mockChannelSearch,
}));

// Provide generalised mock to avoid errors when the TwitchChannelVideos component renders
jest.mock("features/channels/hooks/useGetTwitchVideos", () => ({
  useGetTwitchVideos: () => ({}),
}));

describe("Channel page layout and elements", () => {
  it.todo("Shows the channel title");

  it.todo("Shows the channel thumbnail and banner (if banner exists)");
});

describe("Channel page UI states", () => {
  it.todo("Renders data correctly (no loaders/error UI present)");

  it.todo("Renders only loading UI while data is loading");

  it.todo("Renders only error message when an API error occurs");
});
