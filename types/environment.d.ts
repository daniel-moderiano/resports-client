export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_YOUTUBE_API_KEY: string;
      NEXT_PUBLIC_TWITCH_CLIENT_ID: string;
      NEXT_PUBLIC_TWITCH_CLIENT_SECRET: string;
    }
  }
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
