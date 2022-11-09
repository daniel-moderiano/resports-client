import { useState } from "react";
import styles from "features/players/components/styles/TwitchPlayer.module.css";
import * as React from "react";
import { useTwitchPlayer } from "features/players/api/useTwitchPlayer";
import { TwitchPlayerControls } from "./TwitchPlayerControls";

// TODO: Adjust duration UI so it reflects projected time, not playing catch up with getCurrentTime calls

interface TwitchPlayerProps {
  videoId: string;
}

export const TwitchPlayer = ({ videoId }: TwitchPlayerProps) => {
  const playerDivRef = React.useRef<HTMLDivElement | null>(null);
  const [theaterMode, setTheaterMode] = useState(false);

  // Use local state to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = useState(true);

  // useRef must be used here to avoid losing reference to timeout IDs as the component re-renders between hiding/showing controls
  const inactivityTimeout = React.useRef<null | NodeJS.Timeout>(null);
  const enableCall = React.useRef(true);

  // Indicates whether the user is moving their mouse over the video (i.e. user is active)
  const [userActive, setUserActive] = useState(false);

  // The user should be able to manually disable the overlay to interact with the player in certain circumstances, e.g. mature content, reloading player, etc.
  const [disableControls, setDisableControls] = useState(false);

  const [playerPaused, setPlayerPaused] = useState(false);

  // The currently projected time (in seconds) that the player should be at once the currently queued seek completes.
  // When this is not null, it implies we are currently performing a seek() call.
  const [projectedTime, setProjectedTime] = React.useState<null | number>(null);

  // Adds the Twitch Iframe to the div#player returned below
  const { player } = useTwitchPlayer(videoId, playerDivRef);

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
        setProjectedTime(null);
      });
    }
  }, [player]);

  // A critical effect hook that essentially performs the seek functions scheduled by user clicks and key presses. The 500 ms timeout enables the compound seeking to still work when the seek is 'instant' to a pre-buffered section of video
  React.useEffect(() => {
    if (projectedTime && player) {
      setTimeout(() => {
        player.seek(projectedTime);
      }, 500);
    }
  }, [projectedTime, player]);

  // A general user activity function. Use this whenever the user performs an 'active' action and it will signal the user is interacting with the video, which then enables other features such as showing controls
  const signalUserActivity = () => {
    setUserActive(true);
    clearTimeout(inactivityTimeout.current as NodeJS.Timeout);

    inactivityTimeout.current = setTimeout(function () {
      setUserActive(false);
    }, 3000);
  };

  // Use this to limit how many times the mousemove handler is called. Note this function itself will still be called every time
  const throttleMousemove = () => {
    if (!enableCall.current) {
      return;
    }

    enableCall.current = false;
    signalUserActivity();
    // Unsure exactly which throttle timeout will work best, but 500 seems adequate for now
    setTimeout(() => (enableCall.current = true), 500);
  };

  const scheduleSkipForward = React.useCallback(
    (timeToSkipInSeconds: number) => {
      if (player) {
        let currentTime = player.getCurrentTime();
        if (projectedTime) {
          // A projected time implies we are currently mid-seek
          // Adjust current time using projected time as the base, rather than a getCurrentTime call, thus queuing the calls. E.g. user rapidly clicks +10 min 5 times -> this will ensure we skip back 50 mins
          currentTime = projectedTime;
        }
        setProjectedTime(currentTime + timeToSkipInSeconds);
      }
    },
    [player, projectedTime]
  );

  const scheduleSkipBackward = React.useCallback(
    (timeToSkipInSeconds: number) => {
      if (player) {
        let currentTime = player.getCurrentTime();
        if (projectedTime) {
          // A projected time implies we are currently mid-seek
          // Adjust current time using projected time as the base, rather than a getCurrentTime call, thus queuing the calls.
          currentTime = projectedTime;
        }
        setProjectedTime(currentTime - timeToSkipInSeconds);
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
  }, [player]);

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
  }, [player]);

  // Call this function to switch the iframe/wrapper in and out of fullscreen mode. Esc key press will work as intended without explicitly adding this functionality
  const toggleFullscreen = () => {
    const wrapper: HTMLDivElement | null = document.querySelector("#wrapper");

    // These are async functions, but we are not particularly interested in error handling. This is mainyl to avoid linting errors
    if (!document.fullscreenElement && wrapper) {
      wrapper.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }

    // Move focus to the parent wrapper rather than remaining on the toggleFullscreen btn. This is the extected UX interaction
    if (wrapper) {
      wrapper.focus();
    }
  };

  // Use this to toggle between theater mode. Can be attached to a button or keypress as needed
  const toggleTheater = () => {
    setTheaterMode((prevState) => !prevState);

    // Move focus to the parent wrapper rather than remaining on the toggleFullscreen btn. This is the extected UX interaction
    const wrapper: HTMLDivElement | null = document.querySelector("#wrapper");
    if (wrapper) {
      wrapper.focus();
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
          toggleFullscreen();
          break;
        case "t":
          toggleTheater();
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
          scheduleSkipBackward(10);
          break;
        case "Right": // IE/Edge specific value
        case "ArrowRight":
          scheduleSkipForward(10);
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [
    playOrPauseVideo,
    player,
    toggleMute,
    scheduleSkipForward,
    scheduleSkipBackward,
  ]);

  return (
    <div>
      <div
        id="wrapper"
        className={`${styles.wrapper} ${
          theaterMode ? styles.wrapperTheater : styles.wrapperNormal
        } ${player ? "" : styles.wrapperInitial}`}
        data-testid="wrapper"
        onMouseLeave={() => setUserActive(false)}
        tabIndex={0}
      >
        <div id="player" ref={playerDivRef}></div>
        <div
          className={`${styles.overlay} ${
            userActive || playerPaused ? "" : styles.overlayInactive
          } ${disableControls ? styles.overlayDisabled : ""}`}
          onClick={playOrPauseVideo}
          onDoubleClick={toggleFullscreen}
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
              toggleFullscreen={toggleFullscreen}
              toggleTheater={toggleTheater}
              togglePlay={playOrPauseVideo}
              toggleMute={toggleMute}
              playerMuted={playerMuted}
              skipForward={scheduleSkipForward}
              skipBackward={scheduleSkipBackward}
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
      </div>
      <button onClick={() => setDisableControls((prevState) => !prevState)}>
        Toggle custom controls
      </button>
    </div>
  );
};
