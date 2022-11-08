import { TwitchSearchTab } from "features/search";
import { YouTubeSearchTab } from "features/search";
import { useRouter } from "next/router";
import { useState } from "react";
import { isValidSearchQuery, sanitiseSearchQuery } from "utils/queryHandling";

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
      <section>
        <h3>YouTube results</h3>
        <YouTubeSearchTab searchQuery={sanitiseSearchQuery(UrlQuery)} />
      </section>
    </div>
  );
};

export default Search;
