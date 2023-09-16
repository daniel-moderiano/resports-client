// Note: this does not enable context application with 'this'
export function throttle<T>(func: (...args: T[]) => void, delay = 0) {
  let enableCall = true;

  return (...args: T[]) => {
    if (!enableCall) {
      return;
    }

    func(...args);
    enableCall = false;
    setTimeout(() => {
      enableCall = true;
    }, delay);
  };
}
