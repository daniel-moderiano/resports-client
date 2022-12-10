import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Layout } from "components/Layout";

describe("Layout component", () => {
  it("renders children elements", () => {
    render(
      <Layout>
        <h2>content</h2>
      </Layout>
    );

    const heading = screen.getByRole("heading", {
      name: /content/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("hides sidebar by default", () => {
    render(<Layout />);
    const sidebar = screen.queryByTestId("sidebar");
    expect(sidebar).not.toBeInTheDocument();
  });

  it("toggles sidebar on toggle button click", async () => {
    render(<Layout />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle sidebar/i,
    });
    await userEvent.click(toggleButton);

    const sidebar = screen.queryByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();
  });
});
