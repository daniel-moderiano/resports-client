import {
  Infer,
  object,
  string,
  union,
  literal,
  boolean,
  optional,
  array,
  unknown,
  number,
  record,
} from "superstruct";

// Superstruct definitions
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

export const SuccessApiResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    status: literal("success"),
    data: unknown(),
  }),
});

export const FailApiResponseStruct = object({
  statusCode: number(),
  headers: record(string(), string()),
  body: object({
    status: literal("fail"),
    message: string(),
  }),
});

export const ApiResponseStruct = union([
  SuccessApiResponseStruct,
  FailApiResponseStruct,
]);

// Separate structs for each response
export const AddChannelResponseDataStruct = object({
  channel: ChannelStruct,
});

export const GetSavedChannelsResponseDataStruct = object({
  savedChannels: array(ChannelStruct),
});

export const AddUserResponseDataStruct = object({
  user: UserStruct,
});

export const AddSavedChannelResponseDataStruct = object({
  user: PopulatedUserStruct,
});

// TypeScript types
export type Channel = Infer<typeof ChannelStruct>;
export type User = Infer<typeof UserStruct>;
export type PopulatedUser = Infer<typeof PopulatedUserStruct>;

export type SuccessApiResponseBody<T> = {
  body: {
    status: "success";
    data: T;
  };
};

export type FailApiResponseBody = {
  body: {
    status: "fail";
    message: string;
  };
};

export type FailApiResponse = Infer<typeof FailApiResponseStruct>;
export type SuccessApiResponse<T> = Infer<typeof SuccessApiResponseStruct> &
  SuccessApiResponseBody<T>;
export type ApiResponse<T> = SuccessApiResponse<T> | FailApiResponse;
