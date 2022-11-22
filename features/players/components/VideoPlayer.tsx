import styles from "features/players/components/styles/TwitchPlayer.module.css";
import * as React from "react";
import { toggleFullscreen } from "features/players/utils/toggleFullscreen";
import { throttle } from "utils/throttle";
import { useUserActivity } from "features/players/hooks/useUserActivity";
import VideoContainer from "./VideoContainer";
import { VideoControls } from "features/players";
import { Player } from "../api/player";
import { useSeek } from "../hooks/useSeek";
import { VideoControlIndicator } from "./VideoControlIndicator";
import { useControlIndicators } from "../hooks/useControlIndicators";

export type ControlAction =
  | "play"
  | "pause"
  | "volumeUp"
  | "volumeDown"
  | "mute"
  | "unmute"
  | "forwardOneMins"
  | "forwardFiveMins"
  | "forwardTenMins"
  | "forwardTenSecs"
  | "backOneMins"
  | "backFiveMins"
  | "backTenMins"
  | "backTenSecs";

interface VideoPlayerProps {
  player: Player | null;
  disableControls?: boolean;
}

export const VideoPlayer = ({ player, disableControls }: VideoPlayerProps) => {
  const {
    userActive,
    signalUserInactivity,
    signalUserActivity,
    setLockUserActive,
  } = useUserActivity();
  const { scheduleSeek, projectedTime } = useSeek(player);
  const { showControlIndicator, triggerControlIndication, controlAction } =
    useControlIndicators();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  // Use local state to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = React.useState(true);
  const [playerPaused, setPlayerPaused] = React.useState(false);
  const [theaterMode, setTheaterMode] = React.useState(false);

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
      triggerControlIndication("unmute");
      player.setMuted(false);
    } else {
      setPlayerMuted(true);
      triggerControlIndication("mute");
      player.setMuted(true);
    }
  }, [player, signalUserActivity, triggerControlIndication]);

  // Use this function to play a paused video, or pause a playing video. Intended to activate on clicking the video, or pressing spacebar
  const playOrPauseVideo = React.useCallback(() => {
    if (player) {
      if (player.isPaused()) {
        player.play();
        triggerControlIndication("play");
        // A longer timeout is used here because it can be quite anti-user experience to have controls and cursor fade almost immediately after pressing play.
        setTimeout(() => {
          signalUserInactivity();
        }, 1000);
      } else {
        player.pause();
        triggerControlIndication("pause");
      }
    }
  }, [player, signalUserInactivity, triggerControlIndication]);

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
      "k",
      "f",
      "t",
      "ArrowDown",
      "ArrowUp",
      "ArrowLeft",
      "ArrowRight",
    ];

    const activeDOMKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];

    const handleKeyPress = (event: KeyboardEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const { nodeName, className } = event.target;
      const withinPlayer = event.target.closest("#wrapper");

      // Ensure these key actions do not mess with normal button expectations and functionality
      if (nodeName === "BUTTON" || nodeName === "INPUT") {
        if (className.includes("controlsBtn")) {
          signalUserActivity();
        }
        return;
      }

      // Avoid scrolling the page. Always prioritise play/pause functionality.
      if (event.key === " ") {
        event.preventDefault();
      }

      if (activeDOMKeys.includes(event.key) && !withinPlayer) {
        return;
      }

      if (
        activeUserKeys.includes(event.key) &&
        wrapperRef.current === document.activeElement
      ) {
        event.preventDefault();
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
          if (player.getVolume() === 0) {
            setPlayerMuted(true);
            player.setMuted(true);
            triggerControlIndication("mute");
          } else {
            triggerControlIndication("volumeDown");
          }

          break;
        case "ArrowUp":
          player.setMuted(false);
          setPlayerMuted(false);
          player.setVolume(player.getVolume() + 0.05);
          triggerControlIndication("volumeUp");
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
  }, [
    playOrPauseVideo,
    player,
    toggleMute,
    signalUserActivity,
    scheduleSeek,
    triggerControlIndication,
  ]);

  return (
    <VideoContainer
      signalUserInactivity={signalUserInactivity}
      theaterMode={theaterMode}
      wrapperRef={wrapperRef}
    >
      <div id="player"></div>
      <div
        className={`${styles.overlay} ${
          userActive || playerPaused ? "" : styles.overlayInactive
        } ${disableControls ? styles.overlayDisabled : ""}`}
        onClick={playOrPauseVideo}
        onDoubleClick={() => toggleFullscreen(wrapperRef.current)}
        onMouseMove={throttleMousemove}
        data-testid="overlay"
      ></div>
      <div className={styles.indicatorContainer}>
        <VideoControlIndicator
          ariaLabel="Play"
          controlAction={controlAction}
          triggerAnimation={showControlIndicator}
        />
      </div>

      {player && (
        <div
          className={`${styles.controls} ${
            userActive || playerPaused ? "" : styles.controlsHide
          } ${disableControls ? styles.controlsDisabled : ""}`}
          onMouseMove={throttleMousemove}
          data-testid="customControls"
        >
          <VideoControls
            player={player}
            playerPaused={playerPaused}
            toggleFullscreen={() => toggleFullscreen(wrapperRef.current)}
            toggleTheaterMode={toggleTheaterMode}
            togglePlay={playOrPauseVideo}
            toggleMute={toggleMute}
            playerMuted={playerMuted}
            seek={scheduleSeek}
            projectedTime={projectedTime}
            setLockUserActive={setLockUserActive}
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
  );
};
