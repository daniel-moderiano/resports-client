import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "features/search/components/styles/SearchBar.module.css";

// TODO: Add custom disabled styles that replicate normal btn, but with 'stop sign' cursor

// This component is expected to 'live' in the header and remain visible from all pages of the application
export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("twitch");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Router.push returns a promise, but this is an odd choice, and at this stage there is no intention of awaiting this promise for handling. The void keyword indicates this choice
    if (selectedPlatform === "twitch") {
      void router.push({
        pathname: "/twitch/search",
        query: { searchQuery },
      });
    } else {
      void router.push({
        pathname: "/youtube/search",
        query: { searchQuery },
      });
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <label htmlFor="search" className={styles.label}>
        Search
      </label>
      {/* Consider abstracting this to an icon component */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20px"
        fill="#000000"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
      <input
        type="text"
        id="search"
        placeholder="Search channels"
        onChange={handleChange}
        value={searchQuery}
        spellCheck="false"
        autoCorrect="false"
        autoComplete="false"
      />
      <div>
        <button
          aria-label="Search Twitch"
          className={`${
            selectedPlatform === "twitch"
              ? `${styles.selected} ${styles.button}`
              : styles.button
          }`}
          disabled={searchQuery.trim() === ""}
          onClick={() => setSelectedPlatform("twitch")}
        >
          Search Twitch
        </button>
        <button
          aria-label="Search YouTube"
          className={`${
            selectedPlatform === "youtube"
              ? `${styles.selected} ${styles.button}`
              : styles.button
          }`}
          disabled={searchQuery.trim() === ""}
          onClick={() => setSelectedPlatform("youtube")}
        >
          Search YouTube
        </button>
      </div>
    </form>
  );
};
