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

export type ApiResponseStatus = "success" | "fail" | "error";

export type ApiResponse<T> = {
  status: ApiResponseStatus;
  data: T;
};

export type ErrorApiResponse = ApiResponse<string | null>;

export type FailApiResponse = ApiResponse<Record<string, string>>;

export type SuccessfulDeleteApiResponse = ApiResponse<null>;

export type AddChannelApiResponse = ApiResponse<{ channel: Channel }>;

export type GetSavedChannelsApiResponse = ApiResponse<{
  savedChannels: Channel[];
}>;

export type AddUserApiResponse = ApiResponse<{ user: User }>;

export type AddSavedChannelApiResponse = ApiResponse<{ user: PopulatedUser }>;
