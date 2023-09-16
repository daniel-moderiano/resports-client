import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Layout } from "components/Layout";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: () => ({
    pathname: "/",
  }),
}));

describe("Layout component", () => {
  it.todo("renders children elements");

  it.todo("hides sidebar by default");

  it.todo("toggles sidebar on toggle button click");

  it.todo("toggles overlay when sidebar is opened");

  it.todo("closes sidebar on Esc key press");

  it.todo("closes sidebar on outside click (i.e. overlay click)");
});
