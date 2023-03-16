import { mockUseAuth0, mockUseAuth0ReturnValue } from "mocks/useAuth0.mock";
import { render, screen } from "@testing-library/react";
import { UserMenu } from "../UserMenu";
import userEvent from "@testing-library/user-event";

mockUseAuth0();
mockUseAuth0ReturnValue({
  isAuthenticated: true,
  isLoading: false,
  user: {
    given_name: "John",
    family_name: "Doe",
    updated_at: "2023-03-16T06:18:59.357Z",
    email: "john.doe@gmail.com",
    email_verified: true,
    sub: "google-oauth2|122413423845",
  },
});

describe("Dropdown menu display tests", () => {
  const setup = () => render(<UserMenu />);

  it("Hides menu by default", () => {
    setup();
    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Opens menu on click of menu button if menu is currently closed", async () => {
    setup();
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("Displays user info in user menu list", async () => {
    setup();
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    const user = screen.getByText(/john/i);
    expect(user).toBeInTheDocument();
  });

  it("Closes menu on click of menu button if menu is already open", async () => {
    setup();
    // Open and close with double button press
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);
    await userEvent.click(button);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when any of the menu links are pressed", async () => {
    setup();
    // Open menu
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    const menuBtn = screen.getByRole("menuitem", { name: /settings/i });
    await userEvent.click(menuBtn);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when outside click occurs", async () => {
    setup();

    // Open menu
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    // Outside click by clicking on post body
    await userEvent.click(window.document.body);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when Esc key is pressed", async () => {
    setup();
    // Open menu
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    await userEvent.keyboard("{Escape}");

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Does not close menu when menu is clicked in a non-button area", async () => {
    setup();
    // Open menu
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    const menu = screen.getByRole("menu");
    await userEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });

  it("Allows key navigation using arrow keys and tab key", async () => {
    setup();
    // Open menu
    const button = screen.getByLabelText(/open user menu/i);
    await userEvent.click(button);

    const settingsBtn = screen.getByRole("menuitem", { name: /settings/i });
    const logoutBtn = screen.getByRole("menuitem", { name: /log out/i });

    // Navigate to first menu item
    await userEvent.keyboard("{Tab}");
    expect(settingsBtn).toHaveFocus();

    // Navigate to second menu item
    await userEvent.keyboard("{ArrowDown}");
    expect(logoutBtn).toHaveFocus();

    // Check focus is trapped with arrow keys
    await userEvent.keyboard("{ArrowDown}");
    expect(settingsBtn).toHaveFocus();
  });
});
