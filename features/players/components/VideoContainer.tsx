import * as React from "react";
import styles from "features/players/components/styles/TwitchPlayer.module.css";

interface VideoContainerProps {
  children: React.ReactNode;
  signalUserInactivity: () => void;
  theaterMode: boolean;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

const VideoContainer = ({
  children,
  signalUserInactivity,
  theaterMode,
  wrapperRef,
}: VideoContainerProps) => {
  return (
    <div
      id="wrapper"
      className={`${styles.wrapper} ${
        theaterMode ? styles.wrapperTheater : styles.wrapperNormal
      }`}
      data-testid="wrapper"
      onMouseLeave={signalUserInactivity}
      tabIndex={0}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
};

export default VideoContainer;
