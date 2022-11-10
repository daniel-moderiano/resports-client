import {
  PlayerEvent,
  PlayerWrapper,
} from "features/players/types/playerInterfaceTypes";

export class TwitchPlayerWrapper implements PlayerWrapper {
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

  seek(timestamp: number) {
    this.player.seek(timestamp);
  }

  setQuality(quality: Twitch.VideoQuality) {
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

  getQualities() {
    return this.player.getQualities();
  }

  isPaused() {
    return this.player.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.player.addEventListener(event, callback);
  }
}
