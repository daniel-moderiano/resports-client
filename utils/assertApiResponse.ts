import { is, Struct, validate } from "superstruct";
import { ApiResponseStruct, SuccessApiResponse } from "types/backendAPITypes";

export function assertApiResponse<T>(
  responseData: unknown,
  responseDataStruct: Struct<T>
): asserts responseData is SuccessApiResponse<T> {
  const [error, validationResult] = validate(responseData, ApiResponseStruct);

  if (error) {
    throw new Error("Unknown API response shape");
  }

  // Here we are guaranteed either a successful API response, or failed API response
  if (validationResult.body.status === "fail") {
    throw new Error(validationResult.body.message);
  }

  // Here we are guaranteed a successful API response, but have not yet confirmed the successful data shape
  if (!is(validationResult.body.data, responseDataStruct)) {
    throw new Error(
      "Response data does not match expected API response structure"
    );
  }
}
