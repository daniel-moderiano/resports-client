import { render, screen } from "@testing-library/react";
import Account from "../../pages/account";

describe("Account page", () => {
  it("renders a heading", () => {
    render(<Account />);

    const heading = screen.getByRole("heading", {
      name: /account/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
