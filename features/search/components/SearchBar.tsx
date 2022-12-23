import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "features/search/components/styles/SearchBar.module.css";
import SearchIcon from "icons/SearchIcon";

// TODO: Add custom disabled styles that replicate normal btn, but with 'stop sign' cursor

// This component is expected to 'live' in the header and remain visible from all pages of the application
export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("twitch");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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
    <div>
      <div>
        <select>
          <option value="twitch">Twitch</option>
          <option value="youtube">YouTube</option>
        </select>
      </div>
      <div>
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
      <div>
        <button
          aria-label="Search"
          disabled={searchQuery.trim() === ""}
          onClick={() => {
            updateSearchQuery("twitch");
          }}
        >
          <SearchIcon fill="#000000" />
        </button>
      </div>
    </div>
  );
};
