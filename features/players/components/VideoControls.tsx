import { useState } from "react";
import styles from "features/players/components/styles/YouTubeVideoControls.module.css";
import MutedIcon from "icons/MutedIcon";
import VolumeIcon from "icons/VolumeIcon";
import BackTenIcon from "icons/BackTenIcon";
import BackFiveIcon from "icons/BackFiveIcon";
import BackOneIcon from "icons/BackOneIcon";
import ForwardOneIcon from "icons/ForwardOneIcon";
import ForwardFiveIcon from "icons/ForwardFiveIcon";
import ForwardTenIcon from "icons/ForwardTenIcon";
import ExitFullscreenIcon from "icons/ExitFullscreenIcon";
import EnterFullscreenIcon from "icons/EnterFullscreenIcon";
import TheaterIcon from "icons/TheaterIcon";
import PlayIcon from "icons/PlayIcon";
import PauseIcon from "icons/PauseIcon";
import SettingsGearIcon from "icons/SettingsGearIcon";
import { useVideoTime } from "features/players/hooks/useVideoTime";
import { Player } from "../api/player";

interface VideoControlsProps {
  player: Player;
  playerPaused: boolean;
  toggleFullscreen: () => void;
  toggleTheaterMode: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  skipForward: (timeToSkipInSeconds: number) => void;
  skipBackward: (timeToSkipInSeconds: number) => void;
  playerMuted: boolean;
  projectedTime: number | null;
  hasQualitySettings: boolean;
}

export const VideoControls = ({
  player,
  toggleFullscreen,
  toggleTheaterMode,
  playerPaused,
  togglePlay,
  toggleMute,
  skipBackward,
  skipForward,
  playerMuted,
  projectedTime,
  hasQualitySettings,
}: VideoControlsProps) => {
  // Controls display of video quality settings menu
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const { elapsedDuration } = useVideoTime(player, projectedTime);

  // Use this function in any position where the user's focus should return to the video
  const releaseFocus = () => {
    const wrapper: HTMLDivElement | null = document.querySelector("#wrapper");
    if (wrapper) {
      wrapper.focus();
    }
  };

  return (
    <div className={styles.controlsContainer}>
      <div className={styles.leftControls}>
        <button
          className={styles.controlsBtn}
          onClick={togglePlay}
          id="playBtn"
          aria-label={playerPaused ? "Play video" : "Pause video"}
        >
          {playerPaused ? (
            <PlayIcon
              className={styles.icons32}
              fill="#FFFFFF"
              testId="playIcon"
            />
          ) : (
            <PauseIcon
              className={styles.icons32}
              fill="#FFFFFF"
              testId="pauseIcon"
            />
          )}
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            toggleMute();
            releaseFocus();
          }}
          aria-label={playerMuted ? "Unmute video" : "Mute video"}
        >
          {playerMuted ? (
            <MutedIcon
              className={styles.icons27}
              fill="#FFFFFF"
              testId="mutedIcon"
            />
          ) : (
            <VolumeIcon
              className={styles.icons27}
              fill="none"
              testId="volumeIcon"
            />
          )}
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipBackward(-600);
            releaseFocus();
          }}
          aria-label="Skip backward ten minutes"
        >
          <BackTenIcon className={styles.icons30} fill="#FFFFFF" />
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipBackward(-300);
            releaseFocus();
          }}
          aria-label="Skip backward five minutes"
        >
          <BackFiveIcon className={styles.icons30} fill="#FFFFFF" />
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipBackward(-60);
            releaseFocus();
          }}
          aria-label="Skip backward one minute"
        >
          <BackOneIcon className={styles.icons30} fill="#FFFFFF" />
        </button>

        {/* These duration styles resize to ensure the text is always centered without constantly shifting adjacent divs */}
        <span
          className={`${styles.duration} ${
            elapsedDuration.length > 4 && elapsedDuration.length <= 5
              ? styles.durationMedium
              : ""
          } ${elapsedDuration.length > 5 ? styles.durationLarge : ""}`}
          data-testid="duration"
        >
          {elapsedDuration}
        </span>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipForward(60);
            releaseFocus();
          }}
          aria-label="Skip forward one minute"
        >
          <ForwardOneIcon className={styles.icons30} fill="#FFFFFF" />
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipForward(300);
            releaseFocus();
          }}
          aria-label="Skip forward five minutes"
        >
          <ForwardFiveIcon className={styles.icons30} fill="#FFFFFF" />
        </button>

        <button
          className={styles.controlsBtn}
          onClick={() => {
            skipForward(600);
            releaseFocus();
          }}
          aria-label="Skip forward ten minutes"
        >
          <ForwardTenIcon className={styles.icons30} fill="#FFFFFF" />
        </button>
      </div>

      <div className={styles.rightControls}>
        <button
          className={styles.controlsBtn}
          aria-haspopup="menu"
          aria-label="Open video settings menu"
          onClick={() => setShowSettingsMenu((prevState) => !prevState)}
          data-id="twitchSettingsMenu"
        >
          <SettingsGearIcon className={styles.icons24} fill="#FFFFFF" />
        </button>

        {showSettingsMenu && (
          <div>
            <div>General Settings</div>
            {hasQualitySettings && <div>Quality Settings</div>}
          </div>
        )}

        <button
          className={styles.controlsBtn}
          onClick={toggleTheaterMode}
          data-testid="theater"
          aria-label="Switch to theater mode"
        >
          <TheaterIcon className={styles.icons24} fill="#FFFFFF" />
        </button>

        <button
          className={styles.controlsBtn}
          onClick={toggleFullscreen}
          aria-label={
            document.fullscreenElement
              ? "Exit fullscreen mode"
              : "Enter fullscreen mode"
          }
        >
          {document.fullscreenElement ? (
            <ExitFullscreenIcon
              className={styles.icons30}
              fill="#FFFFFF"
              testId="exitFullscreenIcon"
            />
          ) : (
            <EnterFullscreenIcon
              className={styles.icons30}
              fill="#FFFFFF"
              testId="enterFullscreenIcon"
            />
          )}
        </button>
      </div>
    </div>
  );
};
