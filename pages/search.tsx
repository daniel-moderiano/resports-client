import TwitchSearchTab from "../components/TwitchSearchTab";
import YouTubeSearchTab from "../components/YouTubeSearchTab";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  isValidSearchQuery,
  sanitiseSearchQuery,
} from "../helpers/queryHandling";

const Search = () => {
  const router = useRouter();
  const UrlQuery = router.query;

  const [activeTab, setActiveTab] = useState("twitch");

  // Avoid displaying the default search results page. This alleviates the need to conditionally run the API queries based on checking for valid queries.
  if (!isValidSearchQuery(UrlQuery)) {
    return <div>That is an invalid search. Try another.</div>;
  }

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("twitch")}>Search Twitch</button>
        <button onClick={() => setActiveTab("youtube")}>Search YouTube</button>
      </div>
      <h2>You search for {UrlQuery.searchQuery}</h2>
      <div>
        {activeTab === "twitch" && (
          <section>
            <h3>Twitch results</h3>
            <TwitchSearchTab searchQuery={sanitiseSearchQuery(UrlQuery)} />
          </section>
        )}
        {activeTab === "youtube" && (
          <section>
            <h3>YouTube results</h3>
            <YouTubeSearchTab searchQuery={sanitiseSearchQuery(UrlQuery)} />
          </section>
        )}
      </div>
    </div>
  );
};

export default Search;
