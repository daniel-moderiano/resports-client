import * as React from "react";

export const useTwitchPlayer = (
  videoId: string,
  playerDivRef: React.RefObject<HTMLDivElement | null>
) => {
  const [player, setPlayer] = React.useState<Twitch.Player | null>(null);

  React.useEffect(() => {
    const tag = document.createElement("script");

    // Avoid duplicating script tags in the DOM.
    if (!window.Twitch) {
      tag.src = "https://player.twitch.tv/js/embed/v1.js";
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      // Automatically seeks out a <div> with ID of "player" to append an <iframe> to.
      const player = new Twitch.Player("player", {
        video: videoId,
        autoplay: true,
        controls: false,
      });

      return player;
    };

    // Do not attempt to create the Player until the 3rd party Twitch API has loaded and the global Twitch var is ready.
    const handleTwitchScriptLoad = () => {
      if (!playerDivRef.current) {
        console.error("No containing <div> for <iframe>!");
        return;
      }

      // This avoids rendering multiple stacked iframes within the containing player <div>.
      if (!playerDivRef.current.hasChildNodes()) {
        setPlayer(createPlayer());
      }
    };

    tag.onload = handleTwitchScriptLoad;

    return () => {
      tag.remove();
    };
  }, [videoId, playerDivRef]);

  return {
    player,
  };
};