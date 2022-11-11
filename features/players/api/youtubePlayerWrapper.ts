import {
  PlayerEvent,
  PlayerWrapper,
  VideoQuality,
} from "features/players/types/playerInterfaceTypes";

export class YouTubePlayerWrapper {
  // export class YouTubePlayerWrapper {
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
    return this.player.getAvailableQualityLevels();
  }

  isPaused() {
    return this.player.getPlayerState() === 2;
  }

  // addEventListener(event: PlayerEvent, callback: () => void) {
  //   this.player.addEventListener(event, callback);
  // }
}
