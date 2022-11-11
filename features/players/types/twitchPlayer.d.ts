// Type definitions for Twitch Player API
// Project: https://dev.twitch.tv/
// Definitions by: Daniel Moderiano <https://daniel-moderiano.com>,

/**
 * @see https://dev.twitch.tv/docs/embed/video-and-clips/
 */
declare namespace Twitch {
  /**
   * Allowed suggested player video qualities (default is auto)
   * Chunked represents source quality, and is the highest quality available.
   */
  export type VideoQuality =
    | "160p"
    | "160p30"
    | "360p"
    | "360p30"
    | "480p"
    | "480p30"
    | "720p"
    | "720p60"
    | "1080p"
    | "1080p60"
    | "auto"
    | "chunked";

  /**
   * Twitch player events that can be listened for.
   */
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

  /**
   * YouTube player options.
   */
  export interface PlayerOptions {
    /**
     * Player width.
     */
    width?: string | number | undefined;

    /**
     * Player height
     */
    height?: string | number | undefined;

    /**
     * ID of the video to load.
     */
    video?: string | undefined;

    /**
     * ID of the collection to play videos from.
     */
    collection?: string | undefined;

    /**
     * ID of the channel to play videos from. Channel will be preferred when specified alongside video and/or collection
     */
    channel?: string | undefined;

    /**
     * List of other domains your site is to be embedded on.
     */
    parent?: string[] | undefined;

    /**
     * Whether controls are shown. This also enables/disables keyboard controls.
     * This is a hidden option, i.e. is not listed on Twitch's API documentation
     */
    controls?: boolean | undefined;

    /**
     * Whether to start the video automatically (default true).
     */
    autoplay?: boolean | undefined;

    /**
     * Whether to start the video muted (default false). This will be automatically set to true if autoplay is enabled.
     */
    muted?: boolean | undefined;

    /**
     * Time in the video where playback starts. Valid for VODs only.
     * Specifies hours, minutes, and seconds (default 0h0m0s).
     */
    time?: string | undefined;
  }

  /**
   * Statistics on the embedded video player and the current live stream or VOD
   */
  export interface PlaybackStats {
    /**
     * The version of the Twitch video player backend.
     */
    backendVersion: string;

    /**
     * The size of the video buffer in seconds.
     */
    bufferSize: number;

    /**
     * Codecs currently in use, comma-separated (video,audio).
     */
    codecs: string;

    /**
     * 	The current size of the video player element (eg. 850x480).
     */
    displayResolution: string;

    /**
     * The video playback rate in frames per second. Not available on all browsers.
     */
    fps: number;

    /**
     * 	Current latency to the broadcaster in seconds. Only available for live content.
     */
    hlsLatencyBroadcaster: number;

    /**
     * The playback bitrate in Kbps.
     */
    playbackRate: number;

    /**
     * The number of dropped frames.
     */
    skippedFrames: number;

    /**
     * The native resolution of the current video (eg. 640x480).
     */
    videoResolution: string;
  }

  /**
   * Contains detailed information about an available video quality
   */
  export interface VideoQualityObject {
    name: string;
    group: string;
    codecs: string;
    bitrate: number;
    width: number;
    height: number;
    framerate: number;
    isDefault: boolean;
  }

  /**
   * Creates and controls a Twitch player in an <iframe>.
   */
  export class Player {
    /**
     * Initialises a new instance of the Player class.
     *
     * @param playerDivId   ID of the <div> element to insert the player's <iframe>.
     * @param options   Player options.
     */
    constructor(playerDivId: string, options: PlayerOptions);

    /**
     * Plays the specified video.
     */
    play(): void;

    /**
     * Pauses the currently playing video.
     */
    pause(): void;

    /**
     * Seeks to a specified time in the video.
     *
     * @param timestamp   Timestamp, in seconds from the beginning of the video.
     */
    seek(seconds: number): void;

    /**
     * Disables display of Closed Captions.
     */
    disableCaptions(): void;

    /**
     * Enables display of Closed Captions (if available).
     */
    enableCaptions(): void;

    /**
     * Sets the channel to be played.
     *
     * @param index   ID of the channel to be played.
     */
    setChannel(channel: string): void;

    /**
     * Sets the collection to be played.
     * Optionally also specifies the video within the collection, from which to start playback.
     * @param collectionId   ID of the collection to be played from.
     * @param videoId   ID of the video to start with (within collection)
     */
    setCollection(collectionId: string, videoId?: string): void;

    /**
     * Sets the quality of the video.
     * @param quality   Video quality (string) from the available values
     */
    setQuality(quality: string): void;

    /**
     * Sets the video to be played to be played and starts playback at timestamp (in seconds).
     * @param videoId   ID of the video
     * @param timestamp   Timestamp, in seconds from the beginning of the video.
     */
    setVideo(videoId: string, timestamp: number): void;

    /**
     * Sets the player volume.
     * @param volumeLevel   A number between 0 and 1.0.
     */
    setVolume(volumeLevel: number): void;

    /**
     * @returns Volume level, a number between 0 and 1.0.
     */
    getVolume(): number;

    /**
     * If true, mutes the player; otherwise, unmutes it. This is independent of the volume setting.
     * @param muted   Desired mute state of the player
     */
    setMuted(muted: boolean): void;

    /**
     * @returns True if the player is muted; otherwise, false.
     */
    getMuted(): boolean;

    /**
     * @returns Statistics on the embedded player and current livestream or VOD.
     */
    getPlaybackStats(): PlaybackStats;

    /**
     * @returns The channel's name.
     */
    getChannel(): string;

    /**
     * @returns The current video’s timestamp, in seconds.
     */
    getCurrentTime(): number;

    /**
     * @returns The duration of the video, in seconds.
     */
    getDuration(): number;

    /**
     * @returns True if the live stream or VOD has ended; otherwise, false.
     */
    getEnded(): boolean;

    /**
     * @returns The available video qualities.
     */
    getQualities(): VideoQualityObject[];

    /**
     * @returns The current quality of video playback.
     */
    getQuality(): string;

    /**
     * @returns The video ID. Works only for VODs, not livestreams.
     */
    getVideo(): string;

    /**
     * @returns True if the video is paused; otherwise false. Bufferring or seeking is considered playing.
     */
    isPaused(): boolean;

    /**
     * Adds an event listener for the specified event.
     *
     * @param event   Name of the event.
     * @param callback   Callback/handler for the event.
     */
    addEventListener(event: PlayerEvent, callback: () => void): void;
  }
}
