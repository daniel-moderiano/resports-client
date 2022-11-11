import {
  PlayerEvent,
  PlayerWrapper,
  VideoQuality,
} from "features/players/types/playerInterfaceTypes";

enum TwitchVideoQualityMap {
  ["160p"] = "160p",
  ["160p30"] = "160p30",
  ["360p"] = "360p",
  ["360p30"] = "360p30",
  ["480p"] = "480p",
  ["480p30"] = "480p30",
  ["720p"] = "720p",
  ["720p60"] = "720p60",
  ["1080p"] = "1080p",
  ["1080p60"] = "1080p60",
  ["auto"] = "auto",
  ["max"] = "chunked",
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

  seek(timestamp: number) {
    this.player.seek(timestamp);
  }

  setQuality(quality: VideoQuality) {
    this.player.setQuality(TwitchVideoQualityMap[quality]);
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

  getQualities(): Twitch.VideoQualityObject[] {
    return this.player.getQualities();
  }

  isPaused() {
    return this.player.isPaused();
  }

  addEventListener(event: PlayerEvent, callback: () => void) {
    this.player.addEventListener(event, callback);
  }
}
