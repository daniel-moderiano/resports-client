import * as React from "react";
import { useRouter } from "next/router";
import styles from "features/search/components/styles/SearchBar.module.css";
import SearchIcon from "icons/SearchIcon";

// Logic that allows us to derive a function that checks whether any string is part of the Platform type
const Platform = ["youtube", "twitch"] as const;
export type Platform = typeof Platform[number];

function isPlatform(a: unknown): a is Platform {
  return Platform.indexOf(a as Platform) != -1;
}

// This component is expected to 'live' in the header and remain visible from all pages of the application
export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedPlatform, setSelectedPlatform] =
    React.useState<Platform>("twitch");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isPlatform(e.currentTarget.value)) {
      setSelectedPlatform(e.currentTarget.value);
    }
  };

  const updateSearchQuery = (platform: string) => {
    // Router.push returns a promise, but this is an odd choice, and at this stage there is no intention of awaiting this promise for handling. The void keyword indicates this choice
    void router.push({
      pathname: `/${platform}/search`,
      query: { term: searchQuery },
    });
  };

  const togglePlatform = () => {
    if (selectedPlatform === "twitch") {
      setSelectedPlatform("youtube");
    } else {
      setSelectedPlatform("twitch");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || searchQuery.trim() === "") {
      return;
    }

    updateSearchQuery("twitch");
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label htmlFor="platformSelect" className={styles.label}>
          Select platform
        </label>
        <select
          id="platformSelect"
          value={selectedPlatform}
          onChange={handleSelectChange}
        >
          <option value="twitch">Twitch</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor="search" className={styles.label}>
          Search
        </label>

        <input
          type="text"
          id="search"
          placeholder="Search channels"
          onChange={handleChange}
          value={searchQuery}
          spellCheck="false"
          autoCorrect="false"
          autoComplete="false"
          onKeyDown={handleKeyPress}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.buttonContainer}>
        <button
          aria-label="Search"
          disabled={searchQuery.trim() === ""}
          onClick={() => {
            updateSearchQuery("twitch");
          }}
          className={styles.button}
        >
          <SearchIcon fill="#000000" />
        </button>
      </div>
    </div>
  );
};
