export function throttle<T>(func: (...args: T[]) => void, delay: number) {
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
