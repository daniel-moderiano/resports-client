import * as React from "react";

export const useTwitchPlayer = (
  videoId: string,
  playerDivRef: React.RefObject<HTMLDivElement | null>
) => {
  const [player, setPlayer] = React.useState<Twitch.Player | undefined>(
    undefined
  );

  React.useEffect(() => {
    const tag = document.createElement("script");

    // Avoid duplicating script tags in the DOM.
    if (!window.Twitch) {
      tag.src = "https://player.twitch.tv/js/embed/v1.js";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      const player = new Twitch.Player("player", {
        video: videoId,
        width: 800,
        height: 450,
        autoplay: true,
        controls: false,
      });

      setPlayer(player);
    };

    // Do not attempt to create the Player until the 3rd party Twitch API has loaded and the global Twitch var is ready.
    tag.onload = () => {
      if (!playerDivRef.current) {
        console.error("No containing <div> for <iframe>!");
        return;
      }

      // This avoids rendering multiple stacked iframes within the containing player <div>.
      if (!playerDivRef.current.hasChildNodes()) {
        createPlayer();
      }
    };

    return () => {
      tag.remove();
    };
  }, [videoId, playerDivRef]);

  return {
    player,
  };
};
