export interface VideoQualityObject {
  name: string;
  level: string;
}

export type PlayerEvent =
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
   * 	Player started video playback.
   */
  | "playing"

  /**
   * Player is ready to accept function calls.
   */
  | "ready"

  /**
   * 	User has used the player controls to seek a VOD, specifically when the video resumes playback after successful seek.
   */
  | "seek";

// Define the methods needed by a player API wrapper to ensure it covers all our code needs
export interface PlayerClass {
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
   * @param allowSeekAhead — Whether the player is allowed to make a new request for unbuffered data.
   */
  seek: (timestamp: number, allowSeekAhead?: boolean) => void;

  /**
   * Identifies whether the player allows manual setting of video quality
   */
  hasQualitySettings: () => boolean;

  /**
   * Identifies whether the player allows manual setting of playback speed
   */
  hasPlaybackSpeedSettings: () => boolean;

  /**
   * Sets the quality of the video.
   * @param quality   Video quality (string) from the available values
   */
  setQuality: (quality: string) => void;

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
  getQualities: () => VideoQualityObject[];

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
