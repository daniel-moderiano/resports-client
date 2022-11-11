import {
  PlayerEvent,
  PlayerWrapper,
  VideoQuality,
} from "features/players/types/playerInterfaceTypes";

export enum TwitchVideoQualityMap {
  ["360p"] = "360p",
  ["480p"] = "480p",
  ["720p"] = "720p",
  ["720p60"] = "720p60",
  ["1080p"] = "1080p",
  ["1080p60"] = "1080p60",
  ["auto"] = "auto",
}

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

  hasQualityAdjustment() {
    return true;
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

  getQualities(): string[] {
    const avaiableQualities: string[] = [];

    this.player.getQualities().forEach((quality) => {
      avaiableQualities.push(quality.group);
    });
    return avaiableQualities;
  }

  isPaused() {
    return this.player.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.player.addEventListener(event, callback);
  }
}
