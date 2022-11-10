import {
  PlayerEvent,
  PlayerWrapper,
} from "features/players/types/playerInterfaceTypes";

export class TwitchPlayerWrapper implements PlayerWrapper {
  player: Twitch.Player;

  constructor(player: Twitch.Player) {
    this.player = player;
  }

  play() {}

  pause() {}

  seek(timestamp: number) {}

  setQuality(quality: Twitch.VideoQuality) {}

  setVolume(volumeLevel: number) {}

  getVolume() {
    return 0;
  }

  setMuted(muted: boolean) {}

  getMuted() {
    return true;
  }

  getCurrentTime() {
    return 0;
  }

  getQualities() {
    return [];
  }

  isPaused() {
    return true;
  }

  addEventListener(event: PlayerEvent, callback: () => void) {}
}
