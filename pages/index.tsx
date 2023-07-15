import { useAuth0 } from "@auth0/auth0-react";
import { SavedChannelsList } from "features/saved-channels";
import Head from "next/head";

export default function Home() {
  const { user } = useAuth0();
  return (
    <>
      <Head>
        <title>Resports</title>
      </Head>
      {user && user.sub && <SavedChannelsList userId={user.sub} />}
    </>
  );
}
