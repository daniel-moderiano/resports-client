import { Profile } from "features/auth";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Resports</title>
      </Head>
      <Profile />
    </>
  );
}
