import { render, screen } from "@testing-library/react";
import { SeekIndicator } from "../SeekIndicator";

describe("Seek indicator UI", () => {
  it.todo("Shows correct number of seconds to seek (for seek < 1 min)", () => {
    render(<SeekIndicator projectedSeekInSeconds={10} />);
  });

  it.todo("Shows correct number of minutes to seek (for seek > 1 min)", () => {
    render(<SeekIndicator projectedSeekInSeconds={300} />);
  });

  it.todo("Has correct accessible description for seeking forward", () => {
    render(<SeekIndicator projectedSeekInSeconds={30} />);
  });

  it.todo("Has correct accessible description for seeking backward", () => {
    render(<SeekIndicator projectedSeekInSeconds={-30} />);
  });

  it.todo(
    "Renders right side indicator and facing icon for forward seek",
    () => {
      render(<SeekIndicator projectedSeekInSeconds={30} />);
    }
  );

  it.todo(
    "Renders left side indicator and facing icon for backward seek",
    () => {
      render(<SeekIndicator projectedSeekInSeconds={-30} />);
    }
  );
});
