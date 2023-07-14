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

/**
 * Represents successful API responses.
 * Contains a status of 'success' and any data returned from the API.
 */
export type SuccessApiResponse<T> = {
  status: "success";
  data: T;
};

/**
 * Represents failed API responses.
 * Contains a status of 'fail' and a message detailing the reason for the failure.
 */
export type FailApiResponse = {
  status: "fail";
  message: string;
};

/**
 * A generic API response which could be either a successful or failed response.
 *
 * Use of discrimination unions here means that checking for status "fail" or "success"
 * will automatically result in TypeScript identifying whether the second property is
 * `data` or `message`.
 */
export type ApiResponse<T> = SuccessApiResponse<T> | FailApiResponse;

/**
 * API response type for adding a new channel.
 * On success, it includes the newly added channel information.
 */
export type AddChannelApiResponse = ApiResponse<{ channel: Channel }>;

/**
 * API response type for retrieving saved channels.
 * On success, it includes an array of the saved channels.
 */
export type GetSavedChannelsApiResponse = ApiResponse<{
  savedChannels: Channel[];
}>;

/**
 * API response type for adding a new user.
 * On success, it includes the newly added user's information.
 */
export type AddUserApiResponse = ApiResponse<{ user: User }>;

/**
 * API response type for adding a saved channel to a user's list.
 * On success, it includes the updated user's information.
 */
export type AddSavedChannelApiResponse = ApiResponse<{ user: PopulatedUser }>;
