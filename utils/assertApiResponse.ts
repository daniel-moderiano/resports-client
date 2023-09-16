import { is, Struct } from "superstruct";
import { ApiErrorResponseStruct } from "types/backendAPITypes";

export function assertApiResponse<T>(
  apiResponseData: unknown,
  desiredApiResponseDataStruct: Struct<T>
): asserts apiResponseData is T {
  if (is(apiResponseData, ApiErrorResponseStruct)) {
    throw new Error(apiResponseData.body.errorMessage);
  }

  if (!is(apiResponseData, desiredApiResponseDataStruct)) {
    throw new Error("Failed data validation");
  }
}
