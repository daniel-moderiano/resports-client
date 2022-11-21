import {
  PlayerClass,
  PlayerEvent,
  VideoQualityObject,
} from "features/players/types/playerTypes";

export class TwitchPlayerWrapper implements PlayerClass {
  player: Twitch.Player;

  constructor(player: Twitch.Player) {
    this.player = player;
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  hasQualitySettings() {
    return true;
  }

  hasPlaybackSpeedSettings() {
    return false;
  }

  // ! All playback speed functionality does not exist on Twitch Player API
  getPlaybackSpeed() {
    return 1;
  }

  getAvailablePlaybackSpeeds() {
    return [1];
  }

  setPlaybackSpeed() {
    return;
  }

  seek(timestamp: number) {
    this.player.seek(timestamp);
  }

  setQuality(quality: string) {
    this.player.setQuality(quality);
  }

  setVolume(volumeLevel: number) {
    this.player.setVolume(volumeLevel);
  }

  getVolume() {
    return this.player.getVolume();
  }

  setMuted(muted: boolean) {
    this.player.setMuted(muted);
  }

  getMuted() {
    return this.player.getMuted();
  }

  getCurrentTime() {
    return this.player.getCurrentTime();
  }

  getQualities(): VideoQualityObject[] {
    const videoQualities: VideoQualityObject[] = [];

    this.player.getQualities().forEach((quality) => {
      const qualityObject: VideoQualityObject = {
        name: quality.name,
        level: quality.group,
      };

      videoQualities.push(qualityObject);
    });
    return videoQualities;
  }

  getQuality() {
    const quality = this.player.getQuality();
    // Auto quality is always at index 0
    const topAvailableQuality = this.player.getQualities()[1];

    if (quality === "chunked") {
      return topAvailableQuality.name;
    } else {
      return quality;
    }
  }

  isPaused() {
    return this.player.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.player.addEventListener(event, callback);
  }
}
