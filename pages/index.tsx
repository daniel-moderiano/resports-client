import { RecentlyViewedChannels } from "features/recently-viewed-channels/components/RecentlyViewedChannels";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Resports</title>
      </Head>
      <RecentlyViewedChannels />
    </>
  );
}
