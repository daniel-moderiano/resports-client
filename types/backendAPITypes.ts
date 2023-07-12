import {
  Infer,
  boolean,
  literal,
  object,
  string,
  union,
  array,
  optional,
} from "superstruct";

// Superstruct types for runtime type checking
export const ChannelStruct = object({
  _id: string(),
  platform: union([literal("youtube"), literal("twitch")]),
});

export const UserStruct = object({
  _id: string(),
  email: string(),
  email_verified: boolean(),
  saved_channels: optional(array(string())),
});

export const PopulatedUserStruct = object({
  _id: string(),
  email: string(),
  email_verified: boolean(),
  saved_channels: array(ChannelStruct),
});

export type Channel = Infer<typeof ChannelStruct>;
export type User = Infer<typeof UserStruct>;
export type PopulatedUser = Infer<typeof PopulatedUserStruct>;
