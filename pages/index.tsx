import Profile from "components/Auth0/Profile";
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
