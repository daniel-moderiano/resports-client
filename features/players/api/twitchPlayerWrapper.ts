import {
  PlayerEvent,
  PlayerWrapper,
  VideoQualityObject,
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

  isPaused() {
    return this.player.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.player.addEventListener(event, callback);
  }
}
