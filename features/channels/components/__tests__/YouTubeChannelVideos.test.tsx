import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { YouTubeChannelVideos } from "features/channels";
import { YouTubeVideoListResponse } from "types/youtubeAPITypes";

interface mockYouTubeVideosHook {
  isLoading: boolean;
  isError: boolean;
  data: YouTubeVideoListResponse | undefined;
  error: unknown;
}

// Example data set containing only 2 videos (realistically many data sets will have hundreds)
const testData: YouTubeVideoListResponse = {
  kind: "youtube#videoListResponse",
  etag: "OIXD_w9bjY9uFAEKoH3fPYJnMzc",
  items: [
    {
      kind: "youtube#video",
      etag: "tK4WuaJokHI2p0BnFBbvSBzAht0",
      id: "0ktOUBGxCEw",
      snippet: {
        publishedAt: "2022-07-15T00:21:59Z",
        channelId: "UCbLIqv9Puhyp9_ZjVtfOy7w",
        title:
          "@Florida Mutineers  vs @Boston Breach   | New York Major IV | Day 1",
        description:
          "Welcome to the New York Major! Who do you have taking the win? Catch all the action this weekend from July 14-17.\n\nLink your Activision Account to earn Viewership Rewards during live Call of Duty League Broadcasts — https://www.youtube.com/account_sharing    \nKeep up with the Call of Duty League schedule — https://www.callofdutyleague.com/en-us/schedule?utm_source=cdlweb&utm_medium=navigationbar&utm_campaign=general \nFollow Us on Twitter: https://twitter.com/CODLeague  \n\n2022 CDL Rosters:\n\nAtlanta FaZe\n— Simp, aBeZy, Cellium, Arcitys\nBoston Breach\n— Methodz, TJHaly, Nero, Capsidal \nOpTic Texas \n— Scump, Dashy, Shotzzy, Prolute\nNew York Subliners \n— Crimsix, Hydra, Paulehx, Kismet\nMinnesota Røkkr \n— Priestahh, Attach, Standy, Havok\nSeattle Surge \n— Accuracy, Mack, Pred, Sib\nLA Thieves\n— Drazah, Kenny, Octane, Envoy\nLondon Royal Ravens\n— Afro, Zer0, Nastie, Harry\nToronto Ultra\n— Insight, Cammy, Bance, CleanX\nLos Angeles Guerrillas\n— SlasheR, Spart, Asim, Huke\nFlorida Mutineers (F3F3)\n— Skyz, Owakening, Vivid, Davpadie\nParis Legion\n— Temp, John, Jimbo, GRVTY\n\n#CDL2022 #MajorIV",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/0ktOUBGxCEw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/0ktOUBGxCEw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/0ktOUBGxCEw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Call of Duty League",
        tags: [
          "Call of Duty League",
          "CDL 2022",
          "Call of Duty",
          "Call of Duty Vanguard",
          "Vanguard",
          "COD League",
          "Call of Duty 2022",
          "COD Pro League",
          "100 thieves",
          "Optic Texas",
          "Mutineers",
          "LA Guerrillas",
          "Faze",
          "Boston Breach",
          "Paris Legion",
          "Royal Ravens",
          "Kickoff Classic",
          "New York Subliners",
          "Rokkr",
          "Toronto Ultra",
          "Seattle Surge",
          "Major IV",
          "Major 4",
          "Subliners Major 4",
          "Major 4 CDL",
          "COD League Major",
          "COD Champs",
          "Toronto Ultra highlights",
          "London Ravens highlights",
          "Bance best moments",
          "cleanx highlights",
        ],
        categoryId: "20",
        liveBroadcastContent: "none",
        defaultLanguage: "en",
        localized: {
          title:
            "@Florida Mutineers  vs @Boston Breach   | New York Major IV | Day 1",
          description:
            "Welcome to the New York Major! Who do you have taking the win? Catch all the action this weekend from July 14-17.\n\nLink your Activision Account to earn Viewership Rewards during live Call of Duty League Broadcasts — https://www.youtube.com/account_sharing    \nKeep up with the Call of Duty League schedule — https://www.callofdutyleague.com/en-us/schedule?utm_source=cdlweb&utm_medium=navigationbar&utm_campaign=general \nFollow Us on Twitter: https://twitter.com/CODLeague  \n\n2022 CDL Rosters:\n\nAtlanta FaZe\n— Simp, aBeZy, Cellium, Arcitys\nBoston Breach\n— Methodz, TJHaly, Nero, Capsidal \nOpTic Texas \n— Scump, Dashy, Shotzzy, Prolute\nNew York Subliners \n— Crimsix, Hydra, Paulehx, Kismet\nMinnesota Røkkr \n— Priestahh, Attach, Standy, Havok\nSeattle Surge \n— Accuracy, Mack, Pred, Sib\nLA Thieves\n— Drazah, Kenny, Octane, Envoy\nLondon Royal Ravens\n— Afro, Zer0, Nastie, Harry\nToronto Ultra\n— Insight, Cammy, Bance, CleanX\nLos Angeles Guerrillas\n— SlasheR, Spart, Asim, Huke\nFlorida Mutineers (F3F3)\n— Skyz, Owakening, Vivid, Davpadie\nParis Legion\n— Temp, John, Jimbo, GRVTY\n\n#CDL2022 #MajorIV",
        },
        defaultAudioLanguage: "en",
      },
      contentDetails: {
        duration: "PT1H49M49S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "556",
        likeCount: "17",
        favoriteCount: "0",
        commentCount: "5",
      },
      player: {
        embedHtml:
          '<iframe width="480" height="270" src="//www.youtube.com/embed/0ktOUBGxCEw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      },
    },
    {
      kind: "youtube#video",
      etag: "-2Fd3Agg8FPgse4gqfLm1eML2_U",
      id: "NcXHFd2EF78",
      snippet: {
        publishedAt: "2022-07-14T22:26:02Z",
        channelId: "UCbLIqv9Puhyp9_ZjVtfOy7w",
        title:
          "@Toronto Ultra vs @London Royal Ravens | New York Major IV | Day 1",
        description:
          "Welcome to the New York Major! Who do you have taking the win? Catch all the action this weekend from July 14-17.\n\nLink your Activision Account to earn Viewership Rewards during live Call of Duty League Broadcasts — https://www.youtube.com/account_sharing    \nKeep up with the Call of Duty League schedule — https://www.callofdutyleague.com/en-us/schedule?utm_source=cdlweb&utm_medium=navigationbar&utm_campaign=general \nFollow Us on Twitter: https://twitter.com/CODLeague  \n\n2022 CDL Rosters:\n\nAtlanta FaZe\n— Simp, aBeZy, Cellium, Arcitys\nBoston Breach\n— Methodz, TJHaly, Nero, Capsidal \nOpTic Texas \n— Scump, Dashy, Shotzzy, Prolute\nNew York Subliners \n— Crimsix, Hydra, Paulehx, Kismet\nMinnesota Røkkr \n— Priestahh, Attach, Standy, Havok\nSeattle Surge \n— Accuracy, Mack, Pred, Sib\nLA Thieves\n— Drazah, Kenny, Octane, Envoy\nLondon Royal Ravens\n— Afro, Zer0, Nastie, Harry\nToronto Ultra\n— Insight, Cammy, Bance, CleanX\nLos Angeles Guerrillas\n— SlasheR, Spart, Asim, Huke\nFlorida Mutineers (F3F3)\n— Skyz, Owakening, Vivid, Davpadie\nParis Legion\n— Temp, John, Jimbo, GRVTY\n\n#CDL2022 #MajorIV",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/NcXHFd2EF78/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/NcXHFd2EF78/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/NcXHFd2EF78/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Call of Duty League",
        tags: [
          "Call of Duty League",
          "CDL 2022",
          "Call of Duty",
          "Call of Duty Vanguard",
          "Vanguard",
          "COD League",
          "Call of Duty 2022",
          "COD Pro League",
          "100 thieves",
          "Optic Texas",
          "Mutineers",
          "LA Guerrillas",
          "Faze",
          "Boston Breach",
          "Paris Legion",
          "Royal Ravens",
          "Kickoff Classic",
          "New York Subliners",
          "Rokkr",
          "Toronto Ultra",
          "Seattle Surge",
          "Major IV",
          "Major 4",
          "Subliners Major 4",
          "Major 4 CDL",
          "COD League Major",
          "COD Champs",
          "Toronto Ultra highlights",
          "London Ravens highlights",
          "Bance best moments",
          "cleanx highlights",
        ],
        categoryId: "20",
        liveBroadcastContent: "none",
        defaultLanguage: "en",
        localized: {
          title:
            "@Toronto Ultra vs @London Royal Ravens | New York Major IV | Day 1",
          description:
            "Welcome to the New York Major! Who do you have taking the win? Catch all the action this weekend from July 14-17.\n\nLink your Activision Account to earn Viewership Rewards during live Call of Duty League Broadcasts — https://www.youtube.com/account_sharing    \nKeep up with the Call of Duty League schedule — https://www.callofdutyleague.com/en-us/schedule?utm_source=cdlweb&utm_medium=navigationbar&utm_campaign=general \nFollow Us on Twitter: https://twitter.com/CODLeague  \n\n2022 CDL Rosters:\n\nAtlanta FaZe\n— Simp, aBeZy, Cellium, Arcitys\nBoston Breach\n— Methodz, TJHaly, Nero, Capsidal \nOpTic Texas \n— Scump, Dashy, Shotzzy, Prolute\nNew York Subliners \n— Crimsix, Hydra, Paulehx, Kismet\nMinnesota Røkkr \n— Priestahh, Attach, Standy, Havok\nSeattle Surge \n— Accuracy, Mack, Pred, Sib\nLA Thieves\n— Drazah, Kenny, Octane, Envoy\nLondon Royal Ravens\n— Afro, Zer0, Nastie, Harry\nToronto Ultra\n— Insight, Cammy, Bance, CleanX\nLos Angeles Guerrillas\n— SlasheR, Spart, Asim, Huke\nFlorida Mutineers (F3F3)\n— Skyz, Owakening, Vivid, Davpadie\nParis Legion\n— Temp, John, Jimbo, GRVTY\n\n#CDL2022 #MajorIV",
        },
        defaultAudioLanguage: "en",
      },
      contentDetails: {
        duration: "PT2H6M2S",
        dimension: "2d",
        definition: "hd",
        caption: "false",
        licensedContent: true,
        contentRating: {},
        projection: "rectangular",
      },
      statistics: {
        viewCount: "2182",
        likeCount: "60",
        favoriteCount: "0",
        commentCount: "19",
      },
      player: {
        embedHtml:
          '<iframe width="480" height="270" src="//www.youtube.com/embed/NcXHFd2EF78" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      },
    },
  ],
  pageInfo: {
    totalResults: 50,
    resultsPerPage: 50,
  },
};

const emptyTestData: YouTubeVideoListResponse = {
  kind: "youtube#videoListResponse",
  etag: "OIXD_w9bjY9uFAEKoH3fPYJnMzc",
  items: [],
  pageInfo: {
    totalResults: 50,
    resultsPerPage: 50,
  },
};

// Modify these parameters as needed within individual tests
const mockResult: mockYouTubeVideosHook = {
  isLoading: false,
  isError: false,
  data: undefined,
  error: null,
};

// This mock will produce whichever custom parameters are specified in the mockSearch object above
jest.mock("../../hooks/useGetYouTubeVideos", () => ({
  useGetYouTubeVideos: () => mockResult,
}));

describe("YouTube videos loading/error/data UI states", () => {
  it("Hides the videos by default", () => {
    render(<YouTubeChannelVideos uploadsId="1234" />);

    // Check the reveal button is shown
    const btn = screen.getByRole("button", { name: /reveal videos/i });
    expect(btn).toBeInTheDocument();

    // Ensure the video overlay is shown
    const videos = screen.getByTestId("overlay");
    expect(videos).toBeInTheDocument();
  });

  it("Shows the videos on click of reveal btn", async () => {
    render(<YouTubeChannelVideos uploadsId="1234" />);

    // First click button
    const btn = screen.getByRole("button", { name: /reveal videos/i });
    await userEvent.click(btn);

    // Ensure the video overlay is shown
    const videos = screen.queryByTestId("overlay");
    expect(videos).not.toBeInTheDocument();
  });

  it("Renders only loading UI while data is loading", () => {
    mockResult.isLoading = true;
    render(<YouTubeChannelVideos uploadsId="1234" />);

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
    render(<YouTubeChannelVideos uploadsId="1234" />);

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
    mockResult.data = testData;
    render(<YouTubeChannelVideos uploadsId="1234" />);

    // Check that loading UI is not present
    const loading = screen.queryByText(/loading/i);
    expect(loading).not.toBeInTheDocument();

    // Check that API error UI is not present
    const error = screen.queryByText(/error/i);
    expect(error).not.toBeInTheDocument();

    // Check that data has been rendered
    const videos = screen.getByText(/@Florida Mutineers vs @Boston Breach /i);
    expect(videos).toBeInTheDocument();
  });

  it("Renders custom message for searches that return no results", () => {
    mockResult.isError = false;
    mockResult.isLoading = false;
    // This data does not contain any channel items
    mockResult.data = emptyTestData;
    render(<YouTubeChannelVideos uploadsId="1234" />);
    const msg = screen.getByText(/no videos/i);
    expect(msg).toBeInTheDocument();
  });
});
