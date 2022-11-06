import { render, screen } from "@testing-library/react";
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

  it("contains the header, footer, and sidebar elements", () => {
    render(
      <Layout>
        <h2>content</h2>
      </Layout>
    );

    const header = screen.getByRole("banner");
    const footer = screen.getByRole("contentinfo");
    const sidebar = screen.getByTestId("sidebar");

    expect(header).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(sidebar).toBeInTheDocument();
  });
});
