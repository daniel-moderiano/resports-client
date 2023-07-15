import { useUserId } from "features/auth/hooks/useUserId";
import { SavedChannelsList } from "features/saved-channels";
import Head from "next/head";

export default function Home() {
  const userId = useUserId();
  return (
    <>
      <Head>
        <title>Resports</title>
      </Head>
      {userId && <SavedChannelsList userId={userId} />}
    </>
  );
}
