import { act } from "@testing-library/react";
import { throttle } from "utils/throttle";

const returnsNumber = () => 1;
const throttledFunc = throttle(returnsNumber, 100);

describe("Throttle functionality", () => {
  it("Returns number immediately when unthrottled", () => {
    expect(returnsNumber()).toBe(1);
  });

  it("Returns immediately on first call when throttled", async () => {
    // await act(async () => {
    //   await new Promise((res) => setTimeout(res, 3500));
    // });
    expect(throttledFunc()).toBe(1);
  });
});
