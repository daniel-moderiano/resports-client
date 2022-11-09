// Call this function to switch the iframe/wrapper in and out of fullscreen mode. Esc key press will work as intended without explicitly adding this functionality
export const toggleFullscreen = (wrapper: HTMLDivElement | null) => {
  // These are async functions, but we are not particularly interested in error handling. This is mainyl to avoid linting errors
  if (!document.fullscreenElement && wrapper) {
    wrapper.requestFullscreen().catch((err) => console.error(err));
  } else {
    document.exitFullscreen().catch((err) => console.error(err));
  }

  // Move focus to the parent wrapper rather than remaining on the toggleFullscreen btn. This is the expected UX interaction
  if (wrapper) {
    wrapper.focus();
  }
};
