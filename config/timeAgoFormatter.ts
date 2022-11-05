import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create datetime formatter (English language). This is used to convert JS Dates to a 'x time ago..' format
// Export this for use as needed
export const timeAgo = new TimeAgo("en-AU");
