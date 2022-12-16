import { useGetTwitchVideoDetails } from "features/players/hooks/useGetTwitchVideoDetails";
import React, { useEffect } from "react";
import Image from "next/image";

interface TwitchVideoDetailsProps {
  videoId: string;
}

export const TwitchVideoDetails = ({ videoId }: TwitchVideoDetailsProps) => {
  const { isError, isLoading, data } = useGetTwitchVideoDetails(videoId);

  return (
    <div>
      {data && (
        <section>
          <h2>{data.videoData.title}</h2>
          <p>Uploaded {data.videoData.creationDate.toLocaleDateString()}</p>

          <p>{data.videoData.views} views</p>
          <div>
            <Image
              alt={`${data.userData.displayName} thumbnail`}
              src={data.userData.profilePictureUrl}
              width={100}
              height={100}
            />
            <span>{data.userData.displayName}</span>
            <button>Subscribe</button>
          </div>
        </section>
      )}
    </div>
  );
};
