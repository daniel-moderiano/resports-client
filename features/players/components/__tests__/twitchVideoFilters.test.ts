import {
  filterByDurationTwitch,
  filterByKeywordTwitch,
  filterByDateTwitch,
} from "../helpers/twitchVideoFilters";
import { HelixVideo } from "@twurple/api";

const testVideos: HelixVideo[] = [
  {
    durationInSeconds: 18000, // 05:00:00
    creationDate: new Date(2022, 5, 12),
    title: "video one",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 8274, // 02:15:54
    creationDate: new Date(2022, 4, 12),
    title: "video two",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 10, // 00:00:10
    creationDate: new Date(2022, 3, 12),
    title: "video three",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 45006, // 12:30:06
    creationDate: new Date(2022, 5, 13),
    title: "video four",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 23452, // 06:30:52
    creationDate: new Date(2022, 5, 11),
    title: "video five",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 1234, // 00:20:34
    creationDate: new Date(2022, 5, 12, 5),
    title: "Video six",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
  {
    durationInSeconds: 1000, // 00:20:34
    creationDate: new Date(),
    title: "video seven",
    // @ts-expect-error exact getUser implementation not needed in these tests
    getUser: jest.fn,
  },
];

describe("Filter videos by duration", () => {
  it("returns all videos for a zero second minimum", () => {
    expect(filterByDurationTwitch(testVideos, 0)).toStrictEqual(testVideos);
  });

  it("returns all videos above specified minimum duration", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(filterByDurationTwitch(testVideos, 14400)).toStrictEqual([
      {
        durationInSeconds: 18000, // 05:00:00
        creationDate: new Date(2022, 5, 12),
        title: "video one",
        getUser: jest.fn,
      },
      {
        durationInSeconds: 45006, // 12:30:06
        creationDate: new Date(2022, 5, 13),
        title: "video four",
        getUser: jest.fn,
      },
      {
        durationInSeconds: 23452, // 06:30:52
        creationDate: new Date(2022, 5, 11),
        title: "video five",
        getUser: jest.fn,
      },
    ]);
  });

  it("does not return video with duration equal to the minimum specified", () => {
    expect(filterByDurationTwitch(testVideos, 23452)).toStrictEqual([
      {
        durationInSeconds: 45006, // 12:30:06
        creationDate: new Date(2022, 5, 13),
        title: "video four",
        getUser: jest.fn,
      },
    ]);
  });

  it("returns an empty array if no videos exist above the minimum specified duration", () => {
    expect(filterByDurationTwitch(testVideos, 50000)).toStrictEqual([]);
  });

  it("returns an empty array if no videos exist below the maximum specified duration", () => {
    expect(filterByDurationTwitch(testVideos, 0, 0)).toStrictEqual([]);
  });

  it("returns correct videos in duration interval min-max", () => {
    expect(filterByDurationTwitch(testVideos, 10000, 20000)).toStrictEqual([
      {
        durationInSeconds: 18000, // 05:00:00
        creationDate: new Date(2022, 5, 12),
        title: "video one",
        getUser: jest.fn,
      },
    ]);
  });
});

describe("Filter videos by title keyword", () => {
  it("returns all videos for a single common letter filter (case insensitive)", () => {
    expect(filterByKeywordTwitch(testVideos, "v")).toStrictEqual(testVideos);
  });

  it("returns all videos when the keyword is any amount of whitespace", () => {
    expect(filterByKeywordTwitch(testVideos, "   ")).toStrictEqual(testVideos);
  });

  it("returns the appropriate videos given a single keyword search", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(filterByKeywordTwitch(testVideos, "one")).toStrictEqual([
      {
        durationInSeconds: 18000, // 05:00:00
        creationDate: new Date(2022, 5, 12),
        title: "video one",
        getUser: jest.fn,
      },
    ]);
  });

  it("returns the appropriate videos given a multiple keyword search", () => {
    //  Aim to filter out all those videos less than 4 hours duration
    expect(filterByKeywordTwitch(testVideos, "video two")).toStrictEqual([
      {
        durationInSeconds: 8274, // 02:15:54
        creationDate: new Date(2022, 4, 12),
        title: "video two",
        getUser: jest.fn,
      },
    ]);
  });

  it("returns an empty array if no videos match the search keyword", () => {
    expect(filterByKeywordTwitch(testVideos, "ten")).toStrictEqual([]);
  });
});

describe("Filter videos by date", () => {
  it("returns all videos older than the provided date", () => {
    // Should NOT return the 12/05/2022 05:00:00 video!
    expect(filterByDateTwitch(testVideos, new Date(2022, 5, 12))).toStrictEqual(
      [
        {
          durationInSeconds: 18000, // 05:00:00
          creationDate: new Date(2022, 5, 12),
          title: "video one",
          getUser: jest.fn,
        },
        {
          durationInSeconds: 8274, // 02:15:54
          creationDate: new Date(2022, 4, 12),
          title: "video two",
          getUser: jest.fn,
        },
        {
          durationInSeconds: 10, // 00:00:10
          creationDate: new Date(2022, 3, 12),
          title: "video three",
          getUser: jest.fn,
        },
        {
          durationInSeconds: 23452,
          creationDate: new Date(2022, 5, 11),
          title: "video five",
          getUser: jest.fn,
        },
      ]
    );
  });

  it("includes videos on the specified date (if released at 00:00:00)", () => {
    expect(filterByDateTwitch(testVideos, new Date(2022, 3, 12))).toStrictEqual(
      [
        {
          durationInSeconds: 10, // 00:00:10
          creationDate: new Date(2022, 3, 12),
          title: "video three",
          getUser: jest.fn,
        },
      ]
    );
  });

  it("returns empty list when no videos match the criteria", () => {
    expect(filterByDateTwitch(testVideos, new Date(2021, 7, 3))).toStrictEqual(
      []
    );
  });

  it("returns all videos when the date filter is set to current date/time", () => {
    expect(filterByDateTwitch(testVideos, new Date())).toStrictEqual(
      testVideos
    );
  });
});
