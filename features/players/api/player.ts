import { PlayerEvent, PlayerWrapper } from "../types/playerInterfaceTypes";

export class Player implements PlayerWrapper {
  playerWrapper: PlayerWrapper;

  constructor(playerWrapper: PlayerWrapper) {
    this.playerWrapper = playerWrapper;
  }

  play() {
    this.playerWrapper.play();
  }

  pause() {
    this.playerWrapper.pause();
  }

  seek(timestamp: number) {
    this.playerWrapper.seek(timestamp);
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

  isPaused() {
    return this.playerWrapper.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.playerWrapper.addEventListener(event, callback);
  }
}

export {};
