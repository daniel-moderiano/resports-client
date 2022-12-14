import { YouTubeSearchTab } from "features/search";
import { useRouter } from "next/router";
import { GapiContextProvider } from "providers/GapiContext";
import { isValidSearchQuery, sanitiseSearchQuery } from "utils/queryHandling";

export const YouTubeSearchPage = () => {
  const router = useRouter();
  const UrlQuery = router.query;

  // Avoid displaying the default search results page. This alleviates the need to conditionally run the API queries based on checking for valid queries.
  if (!isValidSearchQuery(UrlQuery)) {
    return <div>That is an invalid search. Try another.</div>;
  }

  return (
    <GapiContextProvider>
      <div>
        <section>
          <h3>YouTube results</h3>
          <YouTubeSearchTab searchQuery={sanitiseSearchQuery(UrlQuery)} />
        </section>
      </div>
    </GapiContextProvider>
  );
};
