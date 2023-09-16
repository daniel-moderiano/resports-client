import {
  User,
  UserApiResponse,
  UserApiResponseStruct,
} from "types/backendAPITypes";
import { assertApiResponse } from "utils/assertApiResponse";

describe("assertApiResponse", () => {
  it("throws an error if the response data matches ApiErrorResponseStruct", () => {
    const errorResponse = {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: "Failed data validation",
    };

    expect(() =>
      assertApiResponse(errorResponse, UserApiResponseStruct)
    ).toThrowError(new Error(errorResponse.body));
  });

  it("throws an error if the response data does not match the provided struct", () => {
    const invalidResponse = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        _id: "1234",
        channel_id: "5678",
      },
    };

    expect(() =>
      assertApiResponse(invalidResponse, UserApiResponseStruct)
    ).toThrowError(new Error("Failed data validation"));
  });

  it("does not throw an error if the response data matches the provided struct", () => {
    const validResponse: UserApiResponse = {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: {
        data: {
          _id: "1234",
          __v: 1234,
          email: "test@example.com",
          email_verified: true,
          saved_channels: [
            {
              channel_id: "5678",
              platform: "twitch",
            },
          ],
        },
      },
    };

    expect(() =>
      assertApiResponse(validResponse, UserApiResponseStruct)
    ).not.toThrow();
  });
});
