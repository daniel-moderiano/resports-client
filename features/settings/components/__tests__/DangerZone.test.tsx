import { render, screen } from "@testing-library/react";
import { DangerZone } from "../DangerZone";

jest.mock("features/settings/api/useDeleteUser", () => ({
  useDeleteUser: () => ({}),
}));

describe("Account deletion section", () => {
  it("hides delete account button when there is no user ID", async () => {
    render(<DangerZone user={{ sub: undefined }} />);

    const deleteButton = screen.queryByRole("button", {
      name: /delete account/i,
    });

    expect(deleteButton).not.toBeInTheDocument();
  });

  it("shows delete account button when there is a user ID", async () => {
    render(<DangerZone user={{ sub: "1234" }} />);
    const deleteButton = screen.getByRole("button", {
      name: /delete account/i,
    });

    expect(deleteButton).toBeInTheDocument();
  });
});
