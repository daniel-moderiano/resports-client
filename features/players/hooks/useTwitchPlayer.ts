import { useEffect } from "react";
import * as React from "react";

export const useTwitchPlayer = (videoId: string) => {
  const [player, setPlayer] = React.useState<Twitch.Player | undefined>(
    undefined
  );

  useEffect(() => {
    const tag = document.createElement("script");

    // This conditional ensures the script tag is added to a fresh page, but does not duplicate. The alternative would be multiple iframes rendering on certain re-renders
    if (!window.Twitch) {
      tag.src = "https://player.twitch.tv/js/embed/v1.js";
      document.body.appendChild(tag);
    }

    function createPlayer() {
      const player = new Twitch.Player("player", {
        video: videoId,
        width: 800,
        height: 450,
        autoplay: true,
        controls: false,
      });

      setPlayer(player);
    }

    // The key to this hook is the generic 'onload' listener. This ensures the player isn't created until the 3rd party script has full loaded.
    tag.onload = createPlayer;

    return () => {
      // ensure script tags are cleaned on dismount
      tag.remove();
    };
  }, [videoId]);

  return {
    player,
  };
};
