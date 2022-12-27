import * as React from "react";
import { useRouter } from "next/router";
import styles from "features/search/components/styles/SearchBar.module.css";
import SearchIcon from "icons/SearchIcon";
import { CustomSelect } from "./SearchSelect";
import { SingleValue } from "react-select";
import CloseIcon from "icons/CloseIcon";
import { Routes } from "config/routes";

export type Platform = "youtube" | "twitch";

type Option = {
  value: Platform;
  label: string;
};

const options: Option[] = [
  { value: "twitch", label: "Twitch" },
  { value: "youtube", label: "YouTube" },
];

// This component is expected to 'live' in the header and remain visible from all pages of the application
export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState<Option>(
    options[0]
  );
  const [inputFocused, setInputFocused] = React.useState(false);

  const updateSearchQuery = (platform: Platform) => {
    // Router.push returns a promise, but this is an odd choice, and at this stage there is no intention of awaiting this promise for handling. The void keyword indicates this choice
    void router.push({
      pathname: Routes.search[platform],
      query: { term: searchQuery },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleSelectChange = (newValue: SingleValue<Option>) => {
    if (newValue !== null) {
      setSelectedOption(newValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchQuery(selectedOption.value);
  };

  return (
    <form
      className={`${styles.container} ${inputFocused ? styles.active : ""}`}
      onSubmit={handleSubmit}
      role="search"
    >
      <div className={styles.selectContainer}>
        <span id="selectLabel" className={styles.label}>
          Select platform
        </span>
        <CustomSelect
          options={options}
          onChange={handleSelectChange}
          defaultValue={selectedOption}
          aria-labelledby="selectLabel"
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>

        <input
          type="text"
          id="search"
          placeholder="Search channels"
          onChange={handleInputChange}
          value={searchQuery}
          spellCheck="false"
          autoCorrect="false"
          autoComplete="false"
          className={styles.searchInput}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button
          className={`${styles.clearInput} ${searchQuery ? "" : styles.hide}`}
          type="button"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search term"
        >
          <CloseIcon fill="#FFFFFF" className={`${styles.closeIcon}`} />
        </button>
      </div>
      <div className={styles.buttonContainer}>
        <button
          aria-label="Search"
          disabled={searchQuery.trim() === ""}
          className={styles.button}
          type="submit"
        >
          <SearchIcon fill="#FFFFFF" className={styles.searchIcon} />
        </button>
      </div>
    </form>
  );
};
