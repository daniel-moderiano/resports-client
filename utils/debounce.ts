// Note: this does not enable context application with 'this'
export function debounce<T>(func: (...args: T[]) => void, delay: number = 0) {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: T[]) => {
    // clearTimeout is a safe function, i.e. does not throw exceptions with invalid IDs.
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
