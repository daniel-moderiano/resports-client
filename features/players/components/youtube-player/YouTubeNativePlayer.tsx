import styles from "features/players/components/styles/YouTubePlayer.module.css";
import * as React from "react";
import { toggleFullscreen } from "features/players/utils/toggleFullscreen";
import { throttle } from "utils/throttle";
import { useUserActivity } from "features/players/hooks/useUserActivity";
import VideoContainer from "../VideoContainer";
import { useYouTubeIframe, VideoControls } from "features/players";
import { useSeek } from "features/players/hooks/useSeek";
interface YouTubeNativePlayerProps {
  videoId: string;
}

export const YouTubeNativePlayer = ({ videoId }: YouTubeNativePlayerProps) => {
  const { player } = useYouTubeIframe(videoId, true);
  const {
    userActive,
    signalUserInactivity,
    signalUserActivity,
    setLockUserActive,
  } = useUserActivity();
  const { scheduleSeek, projectedTime } = useSeek(player);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  // Use local state to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = React.useState(true);
  const [playerPaused, setPlayerPaused] = React.useState(false);
  const [theaterMode, setTheaterMode] = React.useState(false);
  const [showYTControls, setShowYTControls] = React.useState(true);

  // Ensure the local playerState state is set on play/pause events. This ensures other elements modify with each of the changes as needed
  React.useEffect(() => {
    if (player) {
      player.addEventListener("play", () => {
        setPlayerPaused(false);
      });

      player.addEventListener("pause", () => {
        setPlayerPaused(true);
      });
    }
  }, [player]);

  const throttleMousemove = throttle(signalUserActivity, 500);

  // This function is distinct to manually setting a specific volume level, but counts as user activity
  const toggleMute = React.useCallback(() => {
    signalUserActivity();
    if (!player) {
      return;
    }
    if (player.getMuted()) {
      setPlayerMuted(false);
      player.setMuted(false);
    } else {
      setPlayerMuted(true);
      player.setMuted(true);
    }
  }, [player, signalUserActivity]);

  // Use this function to play a paused video, or pause a playing video. Intended to activate on clicking the video, or pressing spacebar
  const playOrPauseVideo = React.useCallback(() => {
    if (player) {
      if (!player.isPaused()) {
        setPlayerPaused(true);
        setTimeout(() => {
          // Give the gradient time to fade in so you can be sure the YT controls are hidden
          player.pause();
        }, 350);
      } else {
        player.play();

        setTimeout(() => {
          // Give the gradient time to fade so you can be sure the YT controls are hidden
          setPlayerPaused(false);
        }, 100);

        // A longer timeout is used here because it can be quite anti-user experience to have controls and cursor fade almost immediately after pressing play.
        setTimeout(() => {
          signalUserInactivity; // ensure video controls fade
        }, 1000);
      }
    }
  }, [player, signalUserInactivity]);

  const toggleTheaterMode = () => {
    setTheaterMode((prevState) => !prevState);
    // Move focus to the parent wrapper rather than remaining on the theater btn. This is the expected UX behaviour for video controls.
    if (wrapperRef.current) {
      wrapperRef.current.focus();
    }
  };

  // A global keypress handler to allow the user to control the video regardless of where they are on the page.
  React.useEffect(() => {
    const activeUserKeys = [
      "m",
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
    ];

    const handleKeyPress = (event: KeyboardEvent) => {
      const { nodeName, className } = event.target as HTMLElement;

      // Ensure these key actions do not mess with normal button expectations and functionality
      if (nodeName === "BUTTON" || nodeName === "INPUT") {
        if (className.includes("controlsBtn")) {
          signalUserActivity();
        } else return;
      }

      if (activeUserKeys.includes(event.key)) {
        signalUserActivity();
      }

      if (!player) {
        return;
      }

      switch (event.key) {
        case "k":
        case " ":
          playOrPauseVideo();
          break;
        case "m":
          toggleMute();
          break;
        case "f":
          toggleFullscreen(wrapperRef.current);
          break;
        case "t":
          toggleTheaterMode();
          break;
        case "ArrowDown":
          player.setVolume(player.getVolume() - 0.05);
          break;
        case "ArrowUp":
          player.setVolume(player.getVolume() + 0.05);
          break;
        case "ArrowLeft":
          scheduleSeek(-10);
          break;
        case "ArrowRight":
          scheduleSeek(10);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [playOrPauseVideo, player, toggleMute, signalUserActivity, scheduleSeek]);

  return (
    <div>
      <VideoContainer
        signalUserInactivity={signalUserInactivity}
        theaterMode={theaterMode}
        wrapperRef={wrapperRef}
      >
        <div id="player"></div>
        {!showYTControls && (
          <div
            className={`${styles.overlay} ${
              userActive || playerPaused ? "" : styles.overlayInactive
            } ${playerPaused ? styles.overlayPaused : styles.overlayPlaying}`}
            onClick={playOrPauseVideo}
            onDoubleClick={() => toggleFullscreen(wrapperRef.current)}
            onMouseMove={throttleMousemove}
            data-testid="overlay"
          ></div>
        )}

        {!showYTControls && player && (
          <div
            className={`${styles.controls} ${
              userActive || playerPaused ? "" : styles.controlsHide
            }`}
            onMouseMove={throttleMousemove}
            data-testid="customControls"
          >
            <VideoControls
              player={player}
              setPlayerMuted={setPlayerMuted}
              playerPaused={playerPaused}
              toggleFullscreen={() => toggleFullscreen(wrapperRef.current)}
              toggleTheaterMode={toggleTheaterMode}
              togglePlay={playOrPauseVideo}
              toggleMute={toggleMute}
              playerMuted={playerMuted}
              seek={scheduleSeek}
              projectedTime={projectedTime}
              setLockUserActive={setLockUserActive}
              signalUserActivity={signalUserActivity}
            />
          </div>
        )}

        {!showYTControls && (
          <div
            className={`${styles.gradient} ${
              userActive || playerPaused ? "" : styles.gradientHide
            }`}
            data-testid="gradient"
          ></div>
        )}

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
      </VideoContainer>
      <div className="playerMode">
        <button
          onClick={() => {
            setShowYTControls(true);
            // If the user switches controls while paused, then pauses the video on YT controls, then switches back to custom controls while paused, the overlay is still in play mode. This happens because the setPlayerState is not called with YT native pause/play. Hence it is manually called here
            if (player && player.isPaused()) {
              setPlayerPaused(true);
            }
          }}
        >
          Show YT Controls
        </button>
        <button
          onClick={() => {
            setShowYTControls(false);
            // If the user switches controls while paused, then plays the video on YT controls, then switches back to custom controls while playing, the overlay is still in pause mode. This happens because the setPlayerState is not called with YT native pause/play. Hence it is manually called here
            if (player && !player.isPaused()) {
              setPlayerPaused(false);
            }
          }}
        >
          Hide YT Controls
        </button>
        <p>{showYTControls ? "YouTube mode" : "Custom mode"}</p>
      </div>
    </div>
  );
};
