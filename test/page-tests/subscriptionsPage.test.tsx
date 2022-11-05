import { render, screen } from "@testing-library/react";
import Subscriptions from "../../pages/subscriptions";

describe("Subscriptions page", () => {
  it("renders a heading", () => {
    render(<Subscriptions />);

    const heading = screen.getByRole("heading", {
      name: /subscriptions/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
