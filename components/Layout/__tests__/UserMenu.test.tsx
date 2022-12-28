import { render, screen } from "@testing-library/react";
import { UserMenu } from "../UserMenu";
import userEvent from "@testing-library/user-event";

describe("Dropdown menu display tests", () => {
  const setup = () => render(<UserMenu />);

  it("Hides menu by default", () => {
    setup();
    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Opens menu on click of profile pic btn if menu is currently closed", () => {
    setup();
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);

    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  it("Closes menu on click of profile pic btn if menu is already open", () => {
    setup();
    // Open and close with double btn press
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);
    userEvent.click(btn);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when any of the menu links are pressed", () => {
    setup();
    // Open menu
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);

    const menuBtn = screen.getByRole("menuitem", { name: /settings/i });
    userEvent.click(menuBtn);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when outside click occurs", () => {
    setup();

    // Open menu
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);

    // Outside click by clicking on post body
    userEvent.click(window.document.body);

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Closes menu when Esc key is pressed", () => {
    setup();
    // Open menu
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);

    userEvent.keyboard("{esc}");

    const menu = screen.queryByRole("menu");
    expect(menu).not.toBeInTheDocument();
  });

  it("Does not close menu when menu is clicked in a non-btn area", () => {
    setup();
    // Open menu
    const btn = screen.getByLabelText(/open user menu/i);
    userEvent.click(btn);

    const menu = screen.getByRole("menu");
    userEvent.click(menu);
    expect(menu).toBeInTheDocument();
  });
});
