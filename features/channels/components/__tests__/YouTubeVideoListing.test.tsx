import { render, screen } from "@testing-library/react";
import { YouTubeVideoResult } from "types/youtubeAPITypes";
import { YouTubeVideoListing } from "features/channels";

const testData: YouTubeVideoResult = {
  kind: "youtube#video",
  etag: "tK4WuaJokHI2p0BnFBbvSBzAht0",
  id: "0ktOUBGxCEw",
  snippet: {
    publishedAt: new Date().toLocaleString(),
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
};

describe("YouTube video listing component", () => {
  it("Includes video thumbnail", () => {
    render(<YouTubeVideoListing videoData={testData} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();
  });

  it("Includes video name", () => {
    render(<YouTubeVideoListing videoData={testData} />);
    const name = screen.getByText(/New York Major IV/i);
    expect(name).toBeInTheDocument();
  });

  it("Includes video duration", () => {
    render(<YouTubeVideoListing videoData={testData} />);
    const duration = screen.getByText("1:49:49");
    expect(duration).toBeInTheDocument();
  });

  it("Includes upload time/date", () => {
    render(<YouTubeVideoListing videoData={testData} />);
    const duration = screen.getByText("just now");
    expect(duration).toBeInTheDocument();
  });

  it("Includes channel name", () => {
    render(<YouTubeVideoListing videoData={testData} />);
    const channelName = screen.getByText(/Call of Duty League/i);
    expect(channelName).toBeInTheDocument();
  });
});
