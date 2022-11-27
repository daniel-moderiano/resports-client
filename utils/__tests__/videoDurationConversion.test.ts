import {
  convertISOToSeconds,
  convertSecondsToHumanReadable,
  convertTwitchVideoDuration,
  convertYouTubeVideoDuration,
  formatElapsedTime,
} from "utils/videoDurationConversion";

describe("Twitch video duration conversion", () => {
  it("Converts seconds-only input", () => {
    expect(convertTwitchVideoDuration("44s")).toBe("0:44");
  });

  it("Converts minutes/seconds-only input", () => {
    expect(convertTwitchVideoDuration("3m21s")).toBe("3:21");
  });

  it("Converts full hours/minutes/seconds input", () => {
    expect(convertTwitchVideoDuration("11h10m12s")).toBe("11:10:12");
  });

  it("Handles single digit hours correctly", () => {
    expect(convertTwitchVideoDuration("5h10m10s")).toBe("5:10:10");
  });

  it("Handles single digit minutes correctly", () => {
    expect(convertTwitchVideoDuration("10h5m12s")).toBe("10:05:12");
  });

  it("Handles single digit seconds correctly", () => {
    expect(convertTwitchVideoDuration("11h10m0s")).toBe("11:10:00");
  });

  it("Handles single digit seconds correctly (leading zeros)", () => {
    expect(convertTwitchVideoDuration("11m1s")).toBe("11:01");
  });
});

describe("YouTube video duration conversion", () => {
  it("Converts seconds-only input", () => {
    expect(convertYouTubeVideoDuration("PT44S")).toBe("0:44");
  });

  it("Converts minutes/seconds-only input", () => {
    expect(convertYouTubeVideoDuration("PT3M21S")).toBe("3:21");
  });

  it("Converts full hours/minutes/seconds input", () => {
    expect(convertYouTubeVideoDuration("PT11H10M12S")).toBe("11:10:12");
  });

  it("Handles single digit hours correctly", () => {
    expect(convertYouTubeVideoDuration("PT5H10M10S")).toBe("5:10:10");
  });

  it("Handles single digit minutes correctly", () => {
    expect(convertYouTubeVideoDuration("PT10H5M12S")).toBe("10:05:12");
  });

  it("Handles single digit seconds correctly (leading zeros)", () => {
    expect(convertYouTubeVideoDuration("PT11M1S")).toBe("11:01");
  });

  it("Handles hours/minutes only input", () => {
    expect(convertYouTubeVideoDuration("PT11H10M")).toBe("11:10:00");
  });

  it("Handles hours only input", () => {
    expect(convertYouTubeVideoDuration("PT11H")).toBe("11:00:00");
  });

  it("Handles minutes only input", () => {
    expect(convertYouTubeVideoDuration("PT11M")).toBe("11:00");
  });

  it("Handles scheduled livestreams", () => {
    expect(convertYouTubeVideoDuration("P0D")).toBe("UPCOMING");
  });

  it("Handles very rare uploaded livestreams > 12 hours", () => {
    expect(convertYouTubeVideoDuration("P868DT11H43M51S")).toBe("12+ hours");
  });
});

describe("ISO to seconds duration conversion", () => {
  it("Converts seconds-only input", () => {
    expect(convertISOToSeconds("PT44S")).toBe(44);
  });

  it("Converts minutes/seconds-only input", () => {
    expect(convertISOToSeconds("PT3M21S")).toBe(201);
  });

  it("Converts full hours/minutes/seconds input", () => {
    expect(convertISOToSeconds("PT11H10M12S")).toBe(40212);
  });

  it("Handles single digit hours correctly", () => {
    expect(convertISOToSeconds("PT5H10M10S")).toBe(18610);
  });

  it("Handles single digit minutes correctly", () => {
    expect(convertISOToSeconds("PT10H5M12S")).toBe(36312);
  });

  it("Handles single digit seconds correctly", () => {
    expect(convertISOToSeconds("PT11H10M0S")).toBe(40200);
  });

  it("Handles single digit seconds correctly (leading zeros)", () => {
    expect(convertISOToSeconds("PT11M1S")).toBe(661);
  });

  it("Handles zero duration input unique to scheduled livestreams", () => {
    expect(convertISOToSeconds("P0D")).toBe(0);
  });

  it("Handles very rare uploaded livestreams > 12 hours", () => {
    expect(convertISOToSeconds("P868DT11H43M51S")).toBe(12);
  });
});

describe("Elapsed duration conversions", () => {
  it("Handles zero second input correctly", () => {
    expect(formatElapsedTime(0)).toBe("0:00");
  });

  it("Rounds <0.5 s input down to 0:00", () => {
    expect(formatElapsedTime(0.2345)).toBe("0:00");
  });

  it("Rounds >0.5 s input down to 0:00", () => {
    expect(formatElapsedTime(0.67678)).toBe("0:00");
  });

  it("Handles second inputs >10 s", () => {
    expect(formatElapsedTime(34)).toBe("0:34");
  });

  it("Handles minute inputs correctly", () => {
    expect(formatElapsedTime(120)).toBe("2:00");
  });

  it("Handles hanging seconds combined with minutes", () => {
    expect(formatElapsedTime(121)).toBe("2:01");
  });

  it("Handles hanging seconds combined with minutes (2)", () => {
    expect(formatElapsedTime(130)).toBe("2:10");
  });

  it("Adds new figure for >10 min inputs", () => {
    expect(formatElapsedTime(620)).toBe("10:20");
  });

  it("Adds new figure for >60 min inputs", () => {
    expect(formatElapsedTime(5400)).toBe("1:30:00");
  });

  it("Handles hanging minute inputs combined with hours", () => {
    expect(formatElapsedTime(3660)).toBe("1:01:00");
  });

  it("Handles hanging minute inputs combined with hours (2)", () => {
    expect(formatElapsedTime(4200)).toBe("1:10:00");
  });

  it("Handles hanging second inputs combined with hours (2)", () => {
    expect(formatElapsedTime(4201)).toBe("1:10:01");
  });

  it("Handles hanging second inputs combined with hours (2)", () => {
    expect(formatElapsedTime(4210)).toBe("1:10:10");
  });

  it("Handles negative duration inputs (from backwards skipping)", () => {
    expect(formatElapsedTime(-600)).toBe("0:00");
  });
});

describe("Seconds to human readable conversions", () => {
  it("Handles zero second input correctly", () => {
    expect(convertSecondsToHumanReadable(0)).toBe("0 seconds");
  });

  it("Handles < 60 second input correctly", () => {
    expect(convertSecondsToHumanReadable(10)).toBe("10 seconds");
  });

  it("Converts 60 seconds to single minute", () => {
    expect(convertSecondsToHumanReadable(60)).toBe("1 minute");
  });

  it("Converts > 60 seconds to minutes", () => {
    expect(convertSecondsToHumanReadable(300)).toBe("5 minutes");
  });

  it("Handles large numbers of seconds (up to 12 hours equivalent)", () => {
    expect(convertSecondsToHumanReadable(43200)).toBe("720 minutes");
  });

  it("Handles negative number inputs", () => {
    expect(convertSecondsToHumanReadable(-10)).toBe("10 seconds");
  });
});
