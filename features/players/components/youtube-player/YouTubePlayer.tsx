import { useYouTubeIframe } from "features/players/api/useYouTubeIframe";
import { useState } from "react";
import styles from "features/players/components/styles/YouTubePlayer.module.css";
import { YouTubeVideoControls } from "./YouTubeVideoControls";
import * as React from "react";
import { throttle } from "utils/throttle";
import { useUserActivity } from "features/players/hooks/useUserActivity";
import VideoContainer from "../VideoContainer";
import { toggleFullscreen } from "features/players/utils/toggleFullscreen";

interface YouTubePlayerProps {
  videoId: string;
}

export const YouTubePlayer = ({ videoId }: YouTubePlayerProps) => {
  const [theaterMode, setTheaterMode] = useState(false);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const seekTimer = React.useRef<NodeJS.Timeout | null>(null);

  // This local state is used to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = useState(false);
  const { userActive, setUserActive, signalUserActivity } = useUserActivity();

  // Initialise playerState in the UNSTARTED state, whose code is -1. This way we can detect an initial change if necessary
  const [playerState, setPlayerState] = useState(-1);

  // Allow the user to manually revert to standard YT controls to allow a manual adjustment to video quality
  const [showYTControls, setShowYTControls] = useState(true);

  // The currently projected time (in seconds) that the player should be at once the currently queued seek completes.
  // When this is not null, it implies we are currently performing a seek() call.
  const [projectedTime, setProjectedTime] = React.useState<null | number>(null);

  const onPlayerStateChange = React.useCallback(
    (event: YT.OnStateChangeEvent) => {
      if (event.data === 1) {
        // playing has commenced, e.g. after a successful seek
        setProjectedTime(null);
      }
    },
    []
  );

  // Adds the YT Iframe to the div#player returned below
  const { player } = useYouTubeIframe(videoId, false, onPlayerStateChange);

  // A critical effect hook that essentially performs the seek functions scheduled by user clicks and key presses. The 500 ms timeout enables the compound seeking to still work when the seek is 'instant' to a pre-buffered section of video
  React.useEffect(() => {
    if (projectedTime && player) {
      setTimeout(() => {
        player.seek(projectedTime, true);
      }, 500);
    }
  }, [projectedTime, player]);

  const throttleMousemove = throttle(signalUserActivity, 500);

  const scheduleSeek = React.useCallback(
    (timeToSkipInSeconds: number) => {
      if (player) {
        clearTimeout(seekTimer.current as NodeJS.Timeout);
        const currentTime = player.getCurrentTime();
        let updatedProjection: number;
        if (projectedTime) {
          updatedProjection = projectedTime + timeToSkipInSeconds;
        } else {
          updatedProjection = currentTime + timeToSkipInSeconds;
        }

        setProjectedTime(updatedProjection);

        seekTimer.current = setTimeout(() => {
          // Use the temp updatedProjection variable to ensure an accurate seek is performed rather than hoping setProjectedTime always resolves before this timeout assignment.
          player.seek(updatedProjection);
        }, 500);
      }
    },
    [player, projectedTime]
  );

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
        setPlayerState(2);
        setTimeout(() => {
          // Give the gradient time to fade in so you can be sure the YT controls are hidden
          player.pause();
        }, 350);
      } else {
        player.play();

        setTimeout(() => {
          // Give the gradient time to fade so you can be sure the YT controls are hidden
          setPlayerState(1);
        }, 100);

        // A longer timeout is used here because it can be quite anti-user experience to have controls and cursor fade almost immediately after pressing play.
        setTimeout(() => {
          setUserActive(false); // ensure video controls fade
        }, 1000);
      }
    }
  }, [player, setUserActive]);

  const toggleTheaterMode = () => {
    setTheaterMode((prevState) => !prevState);

    // Move focus to the parent wrapper rather than remaining on the theater btn. This is the extected UX interaction
    if (wrapperRef.current) {
      wrapperRef.current.focus();
    }
  };

  // A global keypress handler to allow the user to control the video regardless of where they are on the page.
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const focusedElement = event.target as HTMLElement;

      // Ensure these key actions do not mess with normal button expectations and functionality
      if (
        focusedElement.nodeName === "BUTTON" ||
        focusedElement.nodeName === "INPUT"
      ) {
        if (focusedElement.className.includes("controlsBtn")) {
          // user is interacting with video controls
          signalUserActivity();
        }
        return;
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
          signalUserActivity();
          break;
        case "f":
          toggleFullscreen(wrapperRef.current);
          break;
        case "t":
          toggleTheaterMode();
          break;
        case "Down": // IE/Edge specific value
        case "ArrowDown":
          player.setVolume(player.getVolume() - 0.05);
          break;
        case "Up": // IE/Edge specific value
        case "ArrowUp":
          player.setVolume(player.getVolume() + 0.05);
          break;
        case "Left": // IE/Edge specific value
        case "ArrowLeft":
          scheduleSeek(-10);
          break;
        case "Right": // IE/Edge specific value
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
        setUserActive={setUserActive}
        theaterMode={theaterMode}
        wrapperRef={wrapperRef}
      >
        <div id="player"></div>
        {!showYTControls && (
          <div
            className={`${styles.overlay} ${
              playerState === 1 ? styles.overlayPlaying : ""
            } ${playerState === 2 ? styles.overlayPaused : ""} ${
              playerState === 0 ? styles.overlayEnd : ""
            } ${userActive || playerState === 2 ? "" : styles.overlayInactive}`}
            onClick={playOrPauseVideo}
            onDoubleClick={() => toggleFullscreen(wrapperRef.current)}
            onMouseMove={throttleMousemove}
            data-testid="overlay"
          ></div>
        )}

        {!showYTControls && player && (
          <div
            className={`${styles.controls} ${
              userActive || playerState === 2 ? "" : styles.controlsHide
            }`}
            onMouseMove={throttleMousemove}
            data-testid="customControls"
          >
            <YouTubeVideoControls
              player={player}
              playerState={playerState}
              toggleFullscreen={() => toggleFullscreen(wrapperRef.current)}
              toggleTheater={toggleTheaterMode}
              togglePlay={playOrPauseVideo}
              toggleMute={toggleMute}
              playerMuted={playerMuted}
              skipForward={scheduleSeek}
              skipBackward={scheduleSeek}
              projectedTime={projectedTime}
            />
          </div>
        )}

        {!showYTControls && (
          <div
            className={`${styles.gradient} ${
              userActive || playerState === 2 ? "" : styles.gradientHide
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
              setPlayerState(2);
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
              setPlayerState(1);
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
