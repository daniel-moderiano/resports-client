import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HelixVideo } from "@twurple/api/lib";
import { TwitchChannelVideos } from "features/channels";

interface mockTwitchVideosHook {
  isLoading: boolean;
  isError: boolean;
  data: HelixVideo[] | undefined;
  error: unknown;
}

// Example data set containing only 2 videos (realistically many data sets will have hundreds)
const testVideos: HelixVideo[] = [
  {
    description: "",
    duration: "5h0m0s",
    durationInSeconds: 18000,
    id: "1521027333",
    isPublic: true,
    language: "en",
    publishDate: new Date(),
    streamId: "40938585131",
    thumbnailUrl:
      "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/99f9e412e6c974e168ba_loserfruit_40938585131_1656826735//thumb/thumb0-%{width}x%{height}.jpg",
    title: "BEST GAMER EVER?",
    type: "archive",
    url: "https://www.twitch.tv/videos/1521027333",
    userDisplayName: "Loserfruit",
    userId: "41245072",
    userName: "loserfruit",
    views: 54140,
    creationDate: new Date(),
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
    getThumbnailUrl: jest.fn(() => "https://exampleimage.com"),
  },
  {
    creationDate: new Date(),
    description: "",
    duration: "3h45m20s",
    durationInSeconds: 13520,
    id: "1519184419",
    isPublic: true,
    language: "en",
    publishDate: new Date(),
    streamId: "40930856443",
    thumbnailUrl:
      "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/61e4d59d87edf2806c26_loserfruit_40930856443_1656655352//thumb/thumb0-%{width}x%{height}.jpg",
    title: "Sun is shining",
    type: "archive",
    url: "https://www.twitch.tv/videos/1519184419",
    userDisplayName: "Loserfruit",
    userId: "41245072",
    userName: "loserfruit",
    views: 36884,
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
    getThumbnailUrl: jest.fn(() => "https://exampleimage.com"),
  },
];

// Modify these parameters as needed within individual tests
const mockResult: mockTwitchVideosHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// This mock will produce whichever custom parameters are specified in the mockSearch object above
jest.mock("../../hooks/useGetTwitchVideos", () => ({
  useGetTwitchVideos: () => mockResult,
}));

describe("Twitch videos loading/error/data UI states", () => {
  it("Renders only loading UI while data is loading", () => {
    mockResult.isLoading = true;
    render(<TwitchChannelVideos userId="1234" />);

    // Check error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check for loading UI
    const loading = screen.getByText(/loading/i);
    expect(loading).toBeInTheDocument();
  });

  it("Renders only error message when an API error occurs", () => {
    mockResult.isError = true;
    mockResult.isLoading = false;
    render(<TwitchChannelVideos userId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check for error UI
    const error = screen.getByText(/error/i);
    expect(error).toBeInTheDocument();
  });

  it("Renders data once available (no loaders/error UI present)", () => {
    mockResult.isError = false;
    mockResult.isLoading = false;
    mockResult.data = testVideos;
    render(<TwitchChannelVideos userId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that API error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check that data has been rendered
    const videos = screen.getByText(/best gamer ever/i);
    expect(videos).toBeInTheDocument();
  });

  it("Renders custom message for searches that return no results", () => {
    mockResult.isError = false;
    mockResult.isLoading = false;
    // This data does not contain any channel items
    mockResult.data = [];
    render(<TwitchChannelVideos userId="1234" />);
    const msg = screen.getByText(/no videos/i);
    expect(msg).toBeInTheDocument();
  });
});

describe("Video type filter", () => {
  it('Defaults the video type select element to "Broadcasts"', () => {
    render(<TwitchChannelVideos userId="1234" />);
    const selectElement: HTMLSelectElement =
      screen.getByLabelText(/video type/i);
    expect(selectElement.value).toBe("archive");
  });

  it("Correctly handles selecting different video type options", async () => {
    render(<TwitchChannelVideos userId="1234" />);
    const selectElement: HTMLSelectElement =
      screen.getByLabelText(/video type/i);
    const allOption: HTMLOptionElement = screen.getByTestId(/allOption/i);
    await userEvent.selectOptions(selectElement, allOption);
    expect(selectElement.value).toBe("all");
  });
});
