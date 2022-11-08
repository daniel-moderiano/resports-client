import {
  sanitiseSearchQuery,
  isValidSearchQuery,
  sanitiseChannelQuery,
  isValidChannelQuery,
  isValidVideoQuery,
  sanitiseVideoQuery,
} from "utils/queryHandling";

describe("Checking search query validity", () => {
  it("recognises empty search query as invalid", () => {
    expect(isValidSearchQuery({ term: "" })).toBe(false);
  });

  it("recognises whitespace search query as invalid", () => {
    expect(isValidSearchQuery({ term: "   " })).toBe(false);
  });

  it("recognises lack of search term param as invalid", () => {
    expect(isValidSearchQuery({})).toBe(false);
  });

  it("recognises array of search term params as invalid", () => {
    expect(isValidSearchQuery({ term: ["hello", "test"] })).toBe(false);
  });

  it("recognises multiple param query as invalid if search term is not present", () => {
    expect(isValidSearchQuery({ one: "hello", two: "true" })).toBe(false);
  });

  it("recognises multiple param query as valid as long as search term is included", () => {
    expect(isValidSearchQuery({ term: "hello", invalid: "true" })).toBe(true);
  });

  it("recognises valid search query", () => {
    expect(isValidSearchQuery({ term: "hello" })).toBe(true);
  });
});

describe("Performing search query sanitisation", () => {
  it("returns empty string for invalid search queries", () => {
    expect(sanitiseSearchQuery({ invalid: "test" })).toBe("");
  });

  it("returns the search query when it is valid", () => {
    expect(sanitiseSearchQuery({ term: "test" })).toBe("test");
  });
});

describe("Checking channel ID query validity", () => {
  it("recognises empty search query as invalid", () => {
    expect(isValidChannelQuery({ channelId: "" })).toBe(false);
  });

  it("recognises whitespace channel query as invalid", () => {
    expect(isValidChannelQuery({ channelId: "   " })).toBe(false);
  });

  it("recognises lack of channelId param as invalid", () => {
    expect(isValidChannelQuery({})).toBe(false);
  });

  it("recognises array of channelId params as invalid", () => {
    expect(isValidChannelQuery({ channelId: ["1234", "test"] })).toBe(false);
  });

  it("recognises multiple param query as invalid if channelId is not present", () => {
    expect(isValidChannelQuery({ one: "hello", two: "true" })).toBe(false);
  });

  it("recognises multiple param query as valid as long as channelId is included", () => {
    expect(isValidChannelQuery({ channelId: "1234", term: "true" })).toBe(true);
  });

  it("recognises valid channel ID", () => {
    expect(isValidChannelQuery({ channelId: "1234" })).toBe(true);
  });
});

describe("Performing channel ID query sanitisation", () => {
  it("returns empty string for invalid channel IDs", () => {
    expect(sanitiseChannelQuery({ term: "test" })).toBe("");
  });

  it("returns the channel ID when it is valid", () => {
    expect(sanitiseChannelQuery({ channelId: "1234" })).toBe("1234");
  });
});

describe("Checking video ID query validity", () => {
  it("recognises empty video ID as invalid", () => {
    expect(isValidVideoQuery({ videoId: "" })).toBe(false);
  });

  it("recognises whitespace video ID as invalid", () => {
    expect(isValidVideoQuery({ videoId: "   " })).toBe(false);
  });

  it("recognises lack of videoId param as invalid", () => {
    expect(isValidVideoQuery({})).toBe(false);
  });

  it("recognises array of videoId params as invalid", () => {
    expect(isValidVideoQuery({ videoId: ["1234", "test"] })).toBe(false);
  });

  it("recognises multiple param query as invalid if videoId is not present", () => {
    expect(isValidVideoQuery({ one: "hello", two: "true" })).toBe(false);
  });

  it("recognises multiple param query as valid as long as videoId is included", () => {
    expect(isValidVideoQuery({ videoId: "1234", term: "true" })).toBe(true);
  });

  it("recognises valid videoId", () => {
    expect(isValidVideoQuery({ videoId: "1234" })).toBe(true);
  });
});

describe("Performing video ID query sanitisation", () => {
  it("returns empty string for invalid video IDs", () => {
    expect(sanitiseVideoQuery({ invalid: "test" })).toBe("");
  });

  it("returns the video ID when it is valid", () => {
    expect(sanitiseVideoQuery({ videoId: "1234" })).toBe("1234");
  });
});
