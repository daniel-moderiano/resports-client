import { SeekIndicator } from "features/players/components/SeekIndicator";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Resports</title>
      </Head>
      <h2>Home</h2>
      <SeekIndicator projectedSeekInSeconds={10} />
    </>
  );
}
