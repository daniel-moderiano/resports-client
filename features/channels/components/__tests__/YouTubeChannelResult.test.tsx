import { render, screen } from "@testing-library/react";
import { YouTubeSearchResultSnippet } from "types/youtubeAPITypes";
import YouTubeChannelResult from "../../components/YouTubeChannelResult";

const testData: YouTubeSearchResultSnippet = {
  publishedAt: "2015-08-26T11:12:55Z",
  channelId: "UC_qVvdPdMIZDEc6zdj06ilA",
  title: "Smash",
  description:
    "Hi , I'm Smash. I upload funny .io games. Most of them are funny moments and trolling. Most of the time I upload Agar.io, Slither.io ...",
  thumbnails: {
    default: {
      url: "https://yt3.ggpht.com/ytc/AKedOLT_seyyy6UoovylO6PfSQ9WYy3WLh9CF_g4KlgZvw=s88-c-k-c0xffffffff-no-rj-mo",
    },
    medium: {
      url: "https://yt3.ggpht.com/ytc/AKedOLT_seyyy6UoovylO6PfSQ9WYy3WLh9CF_g4KlgZvw=s240-c-k-c0xffffffff-no-rj-mo",
    },
    high: {
      url: "https://yt3.ggpht.com/ytc/AKedOLT_seyyy6UoovylO6PfSQ9WYy3WLh9CF_g4KlgZvw=s800-c-k-c0xffffffff-no-rj-mo",
    },
  },
  channelTitle: "Smash",
  liveBroadcastContent: "none",
  publishTime: "2015-08-26T11:12:55Z",
};

describe("YouTube channel result component", () => {
  // This tests for default thumbnail specifically
  it("Includes channel thumbnail", () => {
    render(<YouTubeChannelResult channelData={testData} />);
    const thumbnail = screen.getByRole("img");
    expect(thumbnail).toBeInTheDocument();
  });

  it("Includes channel name", () => {
    render(<YouTubeChannelResult channelData={testData} />);
    const name = screen.getByText("Smash");
    expect(name).toBeInTheDocument();
  });

  it("Includes channel description", () => {
    render(<YouTubeChannelResult channelData={testData} />);
    const description = screen.getByText(
      "Hi , I'm Smash. I upload funny .io games. Most of them are funny moments and trolling. Most of the time I upload Agar.io, Slither.io ..."
    );
    expect(description).toBeInTheDocument();
  });

  // Unsure if this is to be included
  it.todo("Includes active subscribe button (if not yet subscribed)");
  it.todo('Includes "unsubscribe" button (if already subscribed)');
});
