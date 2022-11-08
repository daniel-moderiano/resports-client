import { TwitchSearchTab } from "features/search";
import { useRouter } from "next/router";
import { isValidSearchQuery, sanitiseSearchQuery } from "utils/queryHandling";

const Search = () => {
  const router = useRouter();
  const UrlQuery = router.query;

  // Avoid displaying the default search results page. This alleviates the need to conditionally run the API queries based on checking for valid queries.
  if (!isValidSearchQuery(UrlQuery)) {
    return <div>That is an invalid search. Try another.</div>;
  }

  return (
    <div>
      <h2>You searched for {UrlQuery.searchQuery}</h2>
      <div>
        <section>
          <h3>Twitch results</h3>
          <TwitchSearchTab searchQuery={sanitiseSearchQuery(UrlQuery)} />
        </section>
      </div>
    </div>
  );
};

export default Search;
