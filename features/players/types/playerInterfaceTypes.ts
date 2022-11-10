export type PlayerEvent =
  /**
   * Closed captions are found in the video content being played.
   */
  | "captions"

  /**
   * Video or stream ends.
   */
  | "ended"
  /**
   * Player is paused. Buffering and seeking is not considered paused.
   */
  | "pause"

  /**
   * Player just unpaused, will either start video playback or start buffering.
   */
  | "play"

  /**
   * Player playback was blocked. Usually fired after an unmuted autoplay or unmuted programmatic call on play().
   */
  | "playback_blocked"

  /**
   * 	Player started video playback.
   */
  | "playing"

  /**
   * Loaded channel goes offline.
   */
  | "offline"

  /**
   * Loaded channel goes online.
   */
  | "online"

  /**
   * Player is ready to accept function calls.
   */
  | "ready"

  /**
   * 	User has used the player controls to seek a VOD, the seek() method has been called, or live playback has seeked to sync up after being paused.
   */
  | "seek";

// Define the methods needed by a player API wrapper to ensure it covers all our code needs
export interface PlayerWrapper {
  /**
   * Plays the specified video.
   */
  play: () => void;

  /**
   * Pauses the currently playing video.
   */
  pause: () => void;

  /**
   * Seeks to a specified time in the video.
   *
   * @param timestamp   Timestamp, in seconds from the beginning of the video.
   */
  seek: (timestamp: number) => void;

  /**
   * Sets the quality of the video.
   * @param quality   Video quality (string) from the available values
   */
  setQuality: (quality: Twitch.VideoQuality) => void;

  /**
   * Sets the player volume.
   * @param volumeLevel   A number between 0 and 1.0.
   */
  setVolume: (volumeLevel: number) => void;

  /**
   * @returns Volume level, a number between 0 and 1.0.
   */
  getVolume: () => number;

  /**
   * If true, mutes the player; otherwise, unmutes it. This is independent of the volume setting.
   * @param muted   Desired mute state of the player
   */
  setMuted: (muted: boolean) => void;

  /**
   * @returns True if the player is muted; otherwise, false.
   */
  getMuted: () => boolean;

  /**
   * @returns The current video’s timestamp, in seconds.
   */
  getCurrentTime: () => number;

  /**
   * @returns The available video qualities.
   */
  getQualities(): Twitch.VideoQualityObject[];

  /**
   * @returns True if the video is paused; otherwise false. Bufferring or seeking is considered playing.
   */
  isPaused: () => boolean;

  /**
   * Adds an event listener for the specified event.
   *
   * @param event   Name of the event.
   * @param callback   Callback/handler for the event.
   */
  addEventListener: (event: PlayerEvent, callback: () => void) => void;
}
