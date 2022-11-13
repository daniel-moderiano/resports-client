import { useYouTubeIframe } from "features/players/api/useYouTubeIframe";
import * as React from "react";
import { VideoPlayer } from "../VideoPlayer";
import styles from "features/players/components/styles/YouTubePlayer.module.css";

interface YouTubePlayerProps {
  videoId: string;
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const { player } = useYouTubeIframe(videoId, true);
  const [showYTControls, setShowYTControls] = React.useState(true);

  return (
    <div>
      <div>
        <VideoPlayer player={player} />
        {showYTControls && (
          <div
            className={styles.YTcontrolsBlocker}
            data-testid="controlsBlocker"
          >
            <div className={styles.YTprogressBlocker}></div>
            <div className={styles.blockersContainer}>
              <div className={styles.leftControlsBlocker}></div>
              <div className={styles.rightControlsBlocker}></div>
            </div>
          </div>
        )}
      </div>

      <div className="playerMode">
        <button
          onClick={() => {
            setShowYTControls(true);
            // If the user switches controls while paused, then pauses the video on YT controls, then switches back to custom controls while paused, the overlay is still in play mode. This happens because the setPlayerState is not called with YT native pause/play. Hence it is manually called here
            // if (player && player.isPaused()) {
            //   setPlayerPaused(true);
            // }
          }}
        >
          Show YT Controls
        </button>
        <button
          onClick={() => {
            setShowYTControls(false);
            // If the user switches controls while paused, then plays the video on YT controls, then switches back to custom controls while playing, the overlay is still in pause mode. This happens because the setPlayerState is not called with YT native pause/play. Hence it is manually called here
            // if (player && !player.isPaused()) {
            //   setPlayerPaused(false);
            // }
          }}
        >
          Hide YT Controls
        </button>
        <p>{showYTControls ? "YouTube mode" : "Custom mode"}</p>
      </div>
    </div>
  );
};
