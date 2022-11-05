import { ParsedUrlQuery } from "querystring";
// These functions exist to help handle URL Query params relating to searching for channels/videos/etc.

// Use this to ensure searchQueries provided via a URL are in the correct format for API calls
export const isValidSearchQuery = (query: ParsedUrlQuery) => {
  if (typeof query.searchQuery === "string") {
    // covers lack of searchQuery param
    return query.searchQuery.trim() !== ""; // covers empty/whitespace strings
  }
  return false;
};

// Provide a sanitised string input to the YouTube API hook. Default to empty string which is a 'general search', however empty string will not pass a validation check so the API should not be called regardless
export const sanitiseSearchQuery = (query: ParsedUrlQuery) => {
  if (isValidSearchQuery(query)) {
    // This is a safe type assertion as the valid query check has passed
    return query.searchQuery as string;
  } else {
    return "";
  }
};

// Use this to ensure channel IDs passed via a URL are in the correct format for API calls
export const isValidChannelQuery = (query: ParsedUrlQuery) => {
  if (typeof query.channelId === "string") {
    // covers lack of channelId param
    return query.channelId.trim() !== ""; // covers empty/whitespace strings
  }
  return false;
};

// Sanitises query params for the Twitch and YouTube channel pages. It is safe to provide an empty string fallback, as this will throw an error accordingly
export const sanitiseChannelQuery = (query: ParsedUrlQuery) => {
  if (isValidChannelQuery(query)) {
    // This is a safe type assertion as the valid query check has passed
    return query.channelId as string;
  } else {
    return "";
  }
};

// Use this to ensure video IDs passed via a URL are in the correct format for API calls
export const isValidVideoQuery = (query: ParsedUrlQuery) => {
  if (typeof query.videoId === "string") {
    // covers lack of videoId param
    return query.videoId.trim() !== ""; // covers empty/whitespace strings
  }
  return false;
};

// Sanitises query params for the Twitch and YouTube videoIds pages. With an empty string ID, no video will load, but the application will not crash
export const sanitiseVideoQuery = (query: ParsedUrlQuery) => {
  if (isValidVideoQuery(query)) {
    // This is a safe type assertion as the valid query check has passed
    return query.videoId as string;
  } else {
    return "";
  }
};
