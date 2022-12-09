import styles from "features/players/components/styles/TwitchPlayer.module.css";
import * as React from "react";
import { toggleFullscreen } from "features/players/utils/toggleFullscreen";
import { throttle } from "utils/throttle";
import { useUserActivity } from "features/players/hooks/useUserActivity";
import VideoContainer from "./VideoContainer";
import { VideoControls } from "features/players";
import { Player } from "../api/player";
import { useSeek } from "../hooks/useSeek";
import { VideoControlIndicator } from "./video-controls/VideoControlIndicator";
import { useControlIndicators } from "../hooks/useControlIndicators";
import { VolumeLevelIndicator } from "./VolumeLevelIndicator";
import { SeekIndicator } from "./SeekIndicator";

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
  const { scheduleSeek, projectedTime, seekAmount } = useSeek(player);
  const {
    showControlIndicator,
    triggerControlIndication,
    controlAction,
    triggerVolumeLevelIndication,
    showVolumeLevelIndicator,
  } = useControlIndicators();
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const [localVolume, setLocalVolume] = React.useState(100);

  // Use local state to avoid the long delays of an API call to check muted state when toggling icons and UI
  const [playerMuted, setPlayerMuted] = React.useState(true);
  const [playerPaused, setPlayerPaused] = React.useState(false);
  const [theaterMode, setTheaterMode] = React.useState(false);

  // Set the player volume according to local changes in volume. By working with the local volume state, we get a fluid UI as opposed to a laggy API interaction. It is fine to have a trace delay between local change and API player volume update.
  React.useEffect(() => {
    console.log(localVolume);

    if (player) {
      player.setVolume(localVolume);
    }
  }, [localVolume, player]);

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
    // Do not adjust local volume to zero here. Local volume maintains the 'memory' of volume when the player is unmuted
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
          signalUserInactivity();
        }, 1000);
      } else {
        player.pause();
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

  React.useEffect(() => {
    addEventListener("performSeek", () => {
      console.log("Seek performed");
    });
  }, []);

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

      const { target, key } = event;
      const withinPlayer = target.closest("#wrapper");

      // Ensure these key actions do not mess with normal button expectations and functionality
      if (target.nodeName === "BUTTON" || target.nodeName === "INPUT") {
        return;
      }

      // Avoid scrolling the page. Always prioritise play/pause functionality.
      if (key === " ") {
        event.preventDefault();
      }

      if (activeDOMKeys.includes(key) && !withinPlayer) {
        return;
      }

      if (
        activeUserKeys.includes(key) &&
        wrapperRef.current === document.activeElement
      ) {
        event.preventDefault();
        signalUserActivity();
      }

      if (!player) {
        return;
      }

      switch (key) {
        case "k":
        case " ":
          playOrPauseVideo();
          if (playerPaused) {
            triggerControlIndication("play");
          } else {
            triggerControlIndication("pause");
          }
          break;
        case "m":
          toggleMute();
          if (playerMuted) {
            triggerControlIndication("unmute");
          } else {
            triggerControlIndication("mute");
          }
          break;
        case "f":
          toggleFullscreen(wrapperRef.current);
          break;
        case "t":
          toggleTheaterMode();
          break;
        case "ArrowDown":
          // player.setVolume(player.getVolume() - 5);
          setLocalVolume((prevVol) => Math.max(prevVol - 5, 0));
          if (player.getVolume() === 0) {
            setPlayerMuted(true);
            player.setMuted(true);
            triggerControlIndication("mute");
          } else {
            triggerControlIndication("volumeDown");
          }
          triggerVolumeLevelIndication();
          break;
        case "ArrowUp":
          player.setMuted(false);
          setPlayerMuted(false);
          // player.setVolume(player.getVolume() + 5);
          setLocalVolume((prevVol) => Math.min(prevVol + 5, 100));
          triggerControlIndication("volumeUp");
          triggerVolumeLevelIndication();
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
    playerMuted,
    playerPaused,
    triggerVolumeLevelIndication,
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
        onClick={() => {
          playOrPauseVideo();
          if (playerPaused) {
            triggerControlIndication("play");
          } else {
            triggerControlIndication("pause");
          }
        }}
        onDoubleClick={() => toggleFullscreen(wrapperRef.current)}
        onMouseMove={throttleMousemove}
        data-testid="overlay"
      ></div>
      <div className={styles.indicatorContainer}>
        {showVolumeLevelIndicator && player && (
          <VolumeLevelIndicator currentVolume={player.getVolume()} />
        )}

        {seekAmount && <SeekIndicator projectedSeekInSeconds={seekAmount} />}

        <VideoControlIndicator
          ariaLabel={controlAction}
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

      <div
        className={`${styles.gradient} ${
          userActive || playerPaused ? "" : styles.gradientHide
        } ${disableControls ? styles.gradientHide : ""}`}
        data-testid="gradient"
      ></div>
    </VideoContainer>
  );
};
