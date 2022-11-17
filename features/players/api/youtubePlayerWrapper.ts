import {
  PlayerEvent,
  PlayerClass,
  VideoQualityObject,
} from "features/players/types/playerTypes";

export class YouTubePlayerWrapper implements PlayerClass {
  player: YT.Player;

  constructor(player: YT.Player) {
    this.player = player;
  }

  play() {
    this.player.playVideo();
  }

  pause() {
    this.player.pauseVideo();
  }

  seek(timestamp: number) {
    this.player.seekTo(timestamp, true);
  }

  hasQualitySettings() {
    return false;
  }

  hasPlaybackSpeedSettings() {
    return true;
  }

  // ! Deprecated functionality
  setQuality(quality: string) {
    this.player.setPlaybackQuality(quality);
  }

  setVolume(volumeLevel: number) {
    this.player.setVolume(volumeLevel * 100);
  }

  getVolume() {
    return this.player.getVolume() / 100;
  }

  setMuted(muted: boolean) {
    if (muted) {
      this.player.mute();
    } else {
      this.player.unMute();
    }
  }

  getMuted() {
    return this.player.isMuted();
  }

  getCurrentTime() {
    return this.player.getCurrentTime();
  }

  getQualities() {
    const videoQualities: VideoQualityObject[] = [];

    this.player.getAvailableQualityLevels().forEach((quality) => {
      const qualityObject: VideoQualityObject = {
        name: quality,
        level: quality,
      };

      videoQualities.push(qualityObject);
    });
    return videoQualities;
  }

  isPaused() {
    return this.player.getPlayerState() === 2;
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    switch (event) {
      case "pause":
        this.player.addEventListener(
          "onStateChange",
          (event: YT.OnStateChangeEvent) => {
            if (event.data === 2) {
              callback();
            }
          }
        );
        break;

      // We are replicating a seek event by listening to a PLAYING event because a switch from BUFFERRING to PLAYING occurs at the end of a seek.
      case "seek":
      case "play":
      case "playing":
        this.player.addEventListener(
          "onStateChange",
          (event: YT.OnStateChangeEvent) => {
            if (event.data === 1) {
              callback();
            }
          }
        );
        break;

      case "ended":
        this.player.addEventListener(
          "onStateChange",
          (event: YT.OnStateChangeEvent) => {
            if (event.data === 0) {
              callback();
            }
          }
        );
        break;

      case "ready":
        this.player.addEventListener("onReady", callback);
        break;
    }
  }
}
