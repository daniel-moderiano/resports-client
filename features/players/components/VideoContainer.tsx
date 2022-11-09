import * as React from "react";
import styles from "features/players/components/styles/TwitchPlayer.module.css";

interface VideoContainerProps {
  children: React.ReactNode;
  setUserActive: React.Dispatch<React.SetStateAction<boolean>>;
  theaterMode: boolean;
  wrapperRef: React.MutableRefObject<HTMLDivElement | null>;
}

const VideoContainer = ({
  children,
  setUserActive,
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
      onMouseLeave={() => setUserActive(false)}
      tabIndex={0}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
};

export default VideoContainer;
