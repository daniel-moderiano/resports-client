import { render, screen } from "@testing-library/react";
import { TwitchChannelResult } from "features/search";
import { HelixChannelSearchResult } from "@twurple/api/lib/api/helix/search/HelixChannelSearchResult";

const testData: HelixChannelSearchResult = {
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
};

const testDataLive: HelixChannelSearchResult = {
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
  isLive: true,
  language: "en",
  name: "loserfruit",
  startDate: null,
  tagIds: [],
  thumbnailUrl:
    "https://static-cdn.jtvnw.net/jtv_user_pictures/fd17325a-7dc2-46c6-8617-e90ec259501c-profile_image-300x300.png",
};

describe("Twitch channel result component", () => {
  it("Includes channel thumbnail", () => {
    render(<TwitchChannelResult channelData={testData} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();
  });

  it("Includes channel name", () => {
    render(<TwitchChannelResult channelData={testData} />);
    const name = screen.getByText("Loserfruit");
    expect(name).toBeInTheDocument();
  });

  it("Includes channel game name (current game)", () => {
    render(<TwitchChannelResult channelData={testData} />);
    const game = screen.getByText("Just Chatting");
    expect(game).toBeInTheDocument();
  });

  it("Includes LIVE indicator for currently streaming channel", () => {
    render(<TwitchChannelResult channelData={testDataLive} />);
    const live = screen.getByText("LIVE");
    expect(live).toBeInTheDocument();
  });

  it("Does not show LIVE indicator for currently offline channel", () => {
    render(<TwitchChannelResult channelData={testData} />);
    const live = screen.queryByText("LIVE");
    expect(live).not.toBeInTheDocument();
  });

  // Unsure if this is to be included
  it.todo("Includes active subscribe button (if not yet subscribed)");
  it.todo('Includes "unsubscribe" button (if already subscribed)');
});
