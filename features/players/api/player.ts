import { PlayerEvent, PlayerClass } from "../types/playerTypes";

export class Player implements PlayerClass {
  playerWrapper: PlayerClass;

  constructor(playerWrapper: PlayerClass) {
    this.playerWrapper = playerWrapper;
  }

  play() {
    this.playerWrapper.play();
  }

  pause() {
    this.playerWrapper.pause();
  }

  hasQualitySettings() {
    return this.playerWrapper.hasQualitySettings();
  }

  hasPlaybackSpeedSettings() {
    return this.playerWrapper.hasPlaybackSpeedSettings();
  }

  getPlaybackSpeed() {
    return this.playerWrapper.getPlaybackSpeed();
  }

  getAvailablePlaybackSpeeds() {
    return this.playerWrapper.getAvailablePlaybackSpeeds();
  }

  setPlaybackSpeed(playbackSpeed: number) {
    this.playerWrapper.setPlaybackSpeed(playbackSpeed);
  }

  seek(timestamp: number, allowSeekAhead?: boolean) {
    if (allowSeekAhead) {
      this.playerWrapper.seek(timestamp, allowSeekAhead);
    } else {
      this.playerWrapper.seek(timestamp);
    }
  }

  setQuality(quality: string) {
    return this.playerWrapper.setQuality(quality);
  }

  setVolume(volumeLevel: number) {
    this.playerWrapper.setVolume(volumeLevel);
  }

  getVolume() {
    return this.playerWrapper.getVolume();
  }

  setMuted(muted: boolean) {
    this.playerWrapper.setMuted(muted);
  }

  getMuted() {
    return this.playerWrapper.getMuted();
  }

  getCurrentTime() {
    return this.playerWrapper.getCurrentTime();
  }

  getQualities() {
    return this.playerWrapper.getQualities();
  }

  getQuality() {
    return this.playerWrapper.getQuality();
  }

  isPaused() {
    return this.playerWrapper.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.playerWrapper.addEventListener(event, callback);
  }
}
