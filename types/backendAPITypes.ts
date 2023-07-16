import {
  Infer,
  object,
  string,
  union,
  literal,
  boolean,
  array,
  number,
  record,
} from "superstruct";

// Superstruct definitions
export const ChannelStruct = object({
  channel_id: string(),
  platform: union([literal("youtube"), literal("twitch")]),
});

export const UserStruct = object({
  _id: string(),
  email: string(),
  email_verified: boolean(),
  saved_channels: array(ChannelStruct),
});

export const ApiErrorResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    errorMessage: string(),
  }),
});

export const UserApiResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    data: UserStruct,
  }),
});

export const SavedChannelsApiResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    data: array(ChannelStruct),
  }),
});

export type Channel = Infer<typeof ChannelStruct>;
export type User = Infer<typeof UserStruct>;
