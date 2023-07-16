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
  nullable,
} from "superstruct";

// Superstruct definitions
export const ChannelStruct = object({
  channel_id: string(),
  platform: union([literal("youtube"), literal("twitch")]),
});

export const UserStruct = object({
  _id: string(),
  // Best not to hide this as it can be used by mongo for verionsing
  __v: number(),
  email: string(),
  email_verified: boolean(),
  saved_channels: array(ChannelStruct),
});

export const ApiSuccessResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    data: nullable(union([UserStruct, array(ChannelStruct)])),
  }),
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
