// Use this to map API quality names to consistent user-understandable quality strings
export const qualityNamesMap: {
  [key: string]: string;
} = {
  // YouTube Quality Names
  hd1080: "1080p",
  hd720: "720p",
  large: "480p",
  medium: "360p",
  small: "240p",
  tiny: "160p",
  auto: "Auto",

  // Twitch Quality Names
  "160p": "160p",
  "160p30": "160p30",
  "360p": "360p",
  "360p30": "360p30",
  "480p": "480p",
  "480p30": "480p30",
  "720p": "720p",
  "720p60": "720p60",
  "1080p": "1080p",
  "1080p60": "1080p60",
  chunked: "1080p60",
};
