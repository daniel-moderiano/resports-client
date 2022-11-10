import styles from "features/players/components/styles/TwitchPlayer.module.css";
import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { TwitchPlayerControls } from "./TwitchPlayerControls";
import { toggleFullscreen } from "features/players/utils/toggleFullscreen";
import { throttle } from "utils/throttle";
import { useUserActivity } from "features/players/hooks/useUserActivity";
import VideoContainer from "../VideoContainer";

interface TwitchPlayerProps {
  videoId: string;
}

export const TwitchPlayer = ({ videoId }: TwitchPlayerProps) => {
  const playerDivRef = React.useRef<HTMLDivElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const seekTimer = React.useRef<NodeJS.Timeout | null>(null);
  const { userActive, setUserActive, signalUserActivity } = useUserActivity();
  const { player } = useTwitchPlayer(videoId, playerDivRef);
  const [theaterMode, setTheaterMode] = React.useState(false);

  // Use local state to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = React.useState(true);
  const [playerPaused, setPlayerPaused] = React.useState(false);

  // The user should be able to manually disable the overlay to interact with the player in certain circumstances, e.g. mature content, reloading player, etc.
  const [disableControls, setDisableControls] = React.useState(false);

  // The currently projected time (in seconds) that the player should be at once the currently queued seek completes.
  // When this is not null, it implies we are currently performing a seek() call.
  const [projectedTime, setProjectedTime] = React.useState<null | number>(null);

  // Ensure the local playerState state is set on play/pause events. This ensures other elements modify with each of the changes as needed
  React.useEffect(() => {
    if (player) {
      player.addEventListener("play", () => {
        setPlayerPaused(false);
      });

      player.addEventListener("pause", () => {
        setPlayerPaused(true);
      });

      // Ensure projectedTime is reset to null to avoid infinite loop seeking or video freezing at fixed time
      player.addEventListener("seek", () => {
        console.log("Seek performed");

        setProjectedTime(null);
      });
    }
  }, [player]);

  const throttleMousemove = throttle(signalUserActivity, 500);

  const scheduleSeek = React.useCallback(
    (timeToSkipInSeconds: number) => {
      if (player) {
        clearTimeout(seekTimer.current as NodeJS.Timeout);
        let currentTime = player.getCurrentTime();
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
        }, 1000);
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
      if (player.isPaused()) {
        player.play();
        // A longer timeout is used here because it can be quite anti-user experience to have controls and cursor fade almost immediately after pressing play.
        setTimeout(() => {
          setUserActive(false); // ensure video controls fade
        }, 1000);
      } else {
        player.pause();
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
        <div id="player" ref={playerDivRef}></div>
        <div
          className={`${styles.overlay} ${
            userActive || playerPaused ? "" : styles.overlayInactive
          } ${disableControls ? styles.overlayDisabled : ""}`}
          onClick={playOrPauseVideo}
          onDoubleClick={() => toggleFullscreen(wrapperRef.current)}
          onMouseMove={throttleMousemove}
          data-testid="overlay"
        ></div>

        {player && (
          <div
            className={`${styles.controls} ${
              userActive || playerPaused ? "" : styles.controlsHide
            } ${disableControls ? styles.controlsDisabled : ""}`}
            onMouseMove={throttleMousemove}
            data-testid="customControls"
          >
            <TwitchPlayerControls
              player={player}
              playerPaused={playerPaused}
              toggleFullscreen={() => toggleFullscreen(wrapperRef.current)}
              toggleTheaterMode={toggleTheaterMode}
              togglePlay={playOrPauseVideo}
              toggleMute={toggleMute}
              playerMuted={playerMuted}
              skipForward={scheduleSeek}
              skipBackward={scheduleSeek}
              projectedTime={projectedTime}
            />
          </div>
        )}

        <div
          className={`${styles.gradient} ${
            userActive || playerPaused ? "" : styles.gradientHide
          } ${disableControls ? styles.gradientHide : ""}`}
          data-testid="gradient"
        ></div>
      </VideoContainer>
      <button onClick={() => setDisableControls((prevState) => !prevState)}>
        Toggle custom controls
      </button>
    </div>
  );
};
