import * as React from "react";
import { Player } from "features/players";
import { TwitchPlayerWrapper } from "features/players";

export const useTwitchPlayer = (videoId: string) => {
  const [player, setPlayer] = React.useState<Player | null>(null);

  React.useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://player.twitch.tv/js/embed/v1.js";

    // Avoid duplicating script tags in the DOM.
    if (!document.contains(tag)) {
      document.body.appendChild(tag);
    }

    const createPlayer = () => {
      // Automatically seeks out a <div> with ID of "player" to append an <iframe> to.
      const player = new Twitch.Player("player", {
        video: videoId,
        autoplay: true,
        controls: false,
      });

      const twitchPlayerWrapper = new TwitchPlayerWrapper(player);
      return new Player(twitchPlayerWrapper);
    };

    // Do not attempt to create the Player until the 3rd party Twitch API has loaded and the global Twitch var is ready.
    const handleTwitchScriptLoad = () => {
      const playerDiv = document.querySelector("#player");
      console.log(playerDiv);

      if (!playerDiv) {
        console.error("No containing <div> for <iframe>!");
        return;
      }

      // This avoids rendering multiple stacked iframes within the containing player <div>.
      if (!playerDiv.hasChildNodes()) {
        setPlayer(createPlayer());
      }
    };

    tag.onload = handleTwitchScriptLoad;

    return () => {
      tag.remove();
    };
  }, [videoId]);

  return {
    player,
  };
};
