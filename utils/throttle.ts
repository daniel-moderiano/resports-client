export const throttle = (func: Function, delay: number) => {
  let enableCall = true;

  return () => {
    if (!enableCall) {
      return;
    }

    func();
    enableCall = false;
    setTimeout(() => {
      enableCall = true;
    }, delay);
  };
};
