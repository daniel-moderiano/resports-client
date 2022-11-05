import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideosFilterMenu from "@/components/VideosFilterMenu";

// Use this before any testing involving the filter controls because they will be initially hidden by default
const setup = async () => {
  render(<VideosFilterMenu setFilters={jest.fn} />);
  const filtersBtn: HTMLButtonElement = screen.getByRole("button", {
    name: /filters/i,
  });
  expect(filtersBtn).toBeInTheDocument();
  // Reveal the filter controls
  await userEvent.click(filtersBtn);
};

describe("Video keyword filter", () => {
  it("Defaults with empty search box", async () => {
    await setup();
    const keywordInput: HTMLInputElement = screen.getByLabelText(/keyword/i);
    expect(keywordInput.value).toBe("");
  });

  it("Correctly updates UI when user types input", async () => {
    await setup();
    const keywordInput: HTMLInputElement = screen.getByLabelText(/keyword/i);

    await userEvent.type(keywordInput, "test");
    expect(keywordInput.value).toBe("test");
  });
});

describe("Video date filter", () => {
  it("Defaults to current date", async () => {
    await setup();
    const datePicker: HTMLInputElement = screen.getByLabelText(/date/i);
    expect(datePicker.value).toBe(new Date().toLocaleDateString("en-CA"));
  });

  it("Updates date picker UI on user date input", async () => {
    await setup();
    const datePicker: HTMLInputElement = screen.getByLabelText(/date/i);
    fireEvent.change(datePicker, { target: { value: "2022-11-11" } });
    expect(datePicker.value).toBe("2022-11-11");
  });
});

describe("Video duration filter", () => {
  it("Gives the user preset duration options", async () => {
    await setup();
    const anyDuration = screen.getByLabelText(/any duration/i);
    const durationOne = screen.getByLabelText(/under 5 minutes/i);
    const durationTwo = screen.getByLabelText(/5 - 60 minutes/i);
    const durationThree = screen.getByLabelText(/1 - 4 hours/i);
    const durationFour = screen.getByLabelText(/over 4 hours/i);
    expect(anyDuration).toBeInTheDocument();
    expect(durationOne).toBeInTheDocument();
    expect(durationTwo).toBeInTheDocument();
    expect(durationThree).toBeInTheDocument();
    expect(durationFour).toBeInTheDocument();
  });

  it('initialises min and max durations to "Any"', async () => {
    await setup();
    const anyDuration: HTMLInputElement =
      screen.getByLabelText(/any duration/i);
    expect(anyDuration.checked).toBe(true);
  });

  it("Allows the user to select a single duration filter at a time", async () => {
    await setup();
    const anyDuration: HTMLInputElement =
      screen.getByLabelText(/any duration/i);
    const durationOne: HTMLInputElement =
      screen.getByLabelText(/under 5 minutes/i);
    const durationTwo: HTMLInputElement =
      screen.getByLabelText(/5 - 60 minutes/i);
    const durationThree: HTMLInputElement =
      screen.getByLabelText(/1 - 4 hours/i);
    const durationFour: HTMLInputElement =
      screen.getByLabelText(/over 4 hours/i);
    await userEvent.click(durationTwo);
    expect(anyDuration.checked).toBe(false);
    expect(durationOne.checked).toBe(false);
    expect(durationTwo.checked).toBe(true);
    expect(durationThree.checked).toBe(false);
    expect(durationFour.checked).toBe(false);
  });
});

describe("Video filter UI", () => {
  it("Defaults with filters hidden", () => {
    render(<VideosFilterMenu setFilters={jest.fn} />);
    const filterControls = screen.queryByLabelText(/duration/i);
    expect(filterControls).not.toBeInTheDocument();
  });

  it("Opens filter controls on click of filters button", async () => {
    render(<VideosFilterMenu setFilters={jest.fn} />);
    const filtersBtn: HTMLButtonElement = screen.getByRole("button", {
      name: /filters/i,
    });
    expect(filtersBtn).toBeInTheDocument();

    // Reveal the filter controls
    await userEvent.click(filtersBtn);
    const filterControls = screen.getByLabelText(/duration/i);
    expect(filterControls).toBeInTheDocument();
  });

  it("Closes filter controls on second click of filters button", async () => {
    render(<VideosFilterMenu setFilters={jest.fn} />);
    const filtersBtn: HTMLButtonElement = screen.getByRole("button", {
      name: /filters/i,
    });
    expect(filtersBtn).toBeInTheDocument();

    // Reveal then hide the filter controls
    await userEvent.click(filtersBtn);
    await userEvent.click(filtersBtn);

    const filterControls = screen.queryByLabelText(/duration/i);
    expect(filterControls).not.toBeInTheDocument();
  });
});

describe("Applying filters", () => {
  it('Sets filters when "Apply filters" is clicked', async () => {
    const mockSetFilters = jest.fn();
    render(<VideosFilterMenu setFilters={mockSetFilters} />);
    const filtersBtn: HTMLButtonElement = screen.getByRole("button", {
      name: /filters/i,
    });
    expect(filtersBtn).toBeInTheDocument();

    // Reveal the filter controls
    await userEvent.click(filtersBtn);

    const applyBtn = screen.getByRole("button", { name: /apply filters/i });
    await userEvent.click(applyBtn);

    expect(mockSetFilters).toHaveBeenCalled();
  });
});
