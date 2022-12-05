import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Player } from "features/players/api/player";
import { VideoSettings } from "features/players";
import { ControlButton } from "./ControlButton";
import { VolumeSlider } from "./VolumeSlider";

interface VideoControlsProps {
  player: Player;
  playerPaused: boolean;
  toggleFullscreen: () => void;
  toggleTheaterMode: () => void;
  togglePlay: () => void;
  toggleMute: () => void;
  seek: (timeToSkipInSeconds: number) => void;
  playerMuted: boolean;
  projectedTime: number | null;
  setLockUserActive: Dispatch<SetStateAction<boolean>>;
}

export const VideoControls = ({
  player,
  toggleFullscreen,
  toggleTheaterMode,
  playerPaused,
  togglePlay,
  toggleMute,
  seek,
  playerMuted,
  projectedTime,
  setLockUserActive,
}: VideoControlsProps) => {
  // Controls display of video quality settings menu
  const [showSettings, setShowSettings] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const { elapsedDuration } = useVideoTime(player, projectedTime);

  // Use this function in any position where the user's focus should return to the video
  const releaseFocus = () => {
    const wrapper: HTMLDivElement | null = document.querySelector("#wrapper");
    if (wrapper) {
      wrapper.focus();
    }
  };

  useEffect(() => {
    if (showSettings) {
      setLockUserActive(true);
    } else {
      setLockUserActive(false);
    }
  }, [showSettings, setLockUserActive]);

  return (
    <div
      className={styles.controlsContainer}
      onMouseLeave={() => setShowVolumeSlider(false)}
    >
      <div
        className={styles.leftControls}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <ControlButton
          tooltipText={playerPaused ? "Play" : "Pause"}
          hideTooltip={showSettings}
          onClick={togglePlay}
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
        </ControlButton>

        <ControlButton
          tooltipText={playerMuted ? "Unmute video" : "Mute video"}
          hideTooltip={showSettings}
          onClick={() => {
            toggleMute();
            releaseFocus();
          }}
          onMouseOver={() => setShowVolumeSlider(true)}
          onFocus={() => setShowVolumeSlider(true)}
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
        </ControlButton>

        <VolumeSlider showVolumeSlider={showVolumeSlider} player={player} />

        <ControlButton
          tooltipText="Back 10 min"
          hideTooltip={showSettings}
          onClick={() => {
            seek(-600);
            releaseFocus();
          }}
          aria-label="Skip backward ten minutes"
        >
          <BackTenIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>

        <ControlButton
          tooltipText="Back 5 min"
          hideTooltip={showSettings}
          onClick={() => {
            seek(-300);
            releaseFocus();
          }}
          aria-label="Skip backward five minutes"
        >
          <BackFiveIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>

        <ControlButton
          tooltipText="Back 1 min"
          hideTooltip={showSettings}
          onClick={() => {
            seek(-60);
            releaseFocus();
          }}
          aria-label="Skip backward one minute"
        >
          <BackOneIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>

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

        <ControlButton
          tooltipText="Forward 1 mins"
          hideTooltip={showSettings}
          onClick={() => {
            seek(60);
            releaseFocus();
          }}
          aria-label="Skip forward one minute"
        >
          <ForwardOneIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>

        <ControlButton
          tooltipText="Forward 5 mins"
          hideTooltip={showSettings}
          onClick={() => {
            seek(300);
            releaseFocus();
          }}
          aria-label="Skip forward five minutes"
        >
          <ForwardFiveIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>

        <ControlButton
          tooltipText="Forward 10 mins"
          hideTooltip={showSettings}
          onClick={() => {
            seek(600);
            releaseFocus();
          }}
          aria-label="Skip forward ten minutes"
        >
          <ForwardTenIcon className={styles.icons30} fill="#FFFFFF" />
        </ControlButton>
      </div>

      <div className={styles.rightControls}>
        <div id="settingsMenuContainer" className={styles.settingsContainer}>
          <ControlButton
            tooltipText="Settings"
            hideTooltip={showSettings}
            aria-haspopup="menu"
            aria-expanded={showSettings}
            aria-label="Open video settings menu"
            onClick={() => setShowSettings((prevState) => !prevState)}
          >
            <SettingsGearIcon className={styles.icons24} fill="#FFFFFF" />
          </ControlButton>
          {showSettings && (
            <VideoSettings
              player={player}
              closeMenu={() => setShowSettings(false)}
            />
          )}
        </div>

        <ControlButton
          tooltipText="Theatre mode"
          hideTooltip={showSettings}
          onClick={toggleTheaterMode}
          aria-label="Switch to theater mode"
        >
          <TheaterIcon className={styles.icons24} fill="#FFFFFF" />
        </ControlButton>

        <ControlButton
          tooltipText="Full screen"
          hideTooltip={showSettings}
          tooltipAlign="right"
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
        </ControlButton>
      </div>
    </div>
  );
};
