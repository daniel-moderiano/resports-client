import {
  PlayerEvent,
  PlayerWrapper,
  VideoQuality,
} from "features/players/types/playerInterfaceTypes";

enum YouTubeVideoQualityMap {
  ["160p"] = "small",
  ["160p30"] = "small",
  ["360p"] = "medium",
  ["360p30"] = "medium",
  ["480p"] = "large",
  ["480p30"] = "large",
  ["720p"] = "hd720",
  ["720p60"] = "hd720",
  ["1080p"] = "hd1080",
  ["1080p60"] = "hd1080",
  ["auto"] = "default",
  ["max"] = "highres",
}

// export class YouTubePlayerWrapper implements PlayerWrapper {
export class YouTubePlayerWrapper {
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

  // ! Deprecated functionality
  setQuality(quality: VideoQuality) {
    this.player.setPlaybackQuality(YouTubeVideoQualityMap[quality]);
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

  // getQualities() {
  //   return this.player.getAvailableQualityLevels();
  // }

  isPaused() {
    return this.player.getPlayerState() === 2;
  }

  // addEventListener(event: PlayerEvent, callback: () => void) {
  //   this.player.addEventListener(event, callback);
  // }
}
