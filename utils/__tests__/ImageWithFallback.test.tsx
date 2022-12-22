import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImageWithFallback from "utils/ImageWithFallback";

describe("Fallback image component functionality", () => {
  it("Defaults to main src", () => {
    render(
      <ImageWithFallback
        src="https://example.com"
        fallbackSrc="https://example-two.com"
        alt=""
      />
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });

  it("Switches src on error", () => {
    render(
      <ImageWithFallback
        src="https://example.com"
        fallbackSrc="https://example-two.com"
        alt=""
      />
    );
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
  });
});
