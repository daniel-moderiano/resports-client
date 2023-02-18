export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_YOUTUBE_API_KEY: string;
      NEXT_PUBLIC_TWITCH_CLIENT_ID: string;
      NEXT_PUBLIC_TWITCH_CLIENT_SECRET: string;
      NEXT_PUBLIC_AUTH0_CLIENT_ID: string;
      NEXT_PUBLIC_AUTH0_DOMAIN: string;
      NEXT_PUBLIC_AUTH0_JWT_AUDIENCE: string;
      NEXT_PUBLIC_AUTH0_CALLBACK_URI: string;
      NEXT_PUBLIC_AUTH0_LOGOUT_URI: string;
    }
  }
  interface Window {
    YT: YT;
    onYouTubeIframeAPIReady: () => void;
  }
}
