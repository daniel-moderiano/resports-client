/**
 * Save an item to local storage.
 *
 * @param key - The key under which the item should be stored.
 * @param value - The value to store, which will be JSON.stringified before storage.
 */
export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
}

/**
 * Get an item from local storage.
 *
 * @param key - The key under which the item is stored.
 * @returns The retrieved item, or null if the item does not exist or there was an error retrieving it.
 */
export function getFromLocalStorage<T>(key: string): T | null {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? (JSON.parse(serializedValue) as T) : null;
  } catch (error) {
    console.error("Failed to get item from local storage", error);
    return null;
  }
}

/**
 * Remove an item from local storage.
 *
 * @param key - The key of the item to remove.
 */
export function clearLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to remove item from local storage", error);
  }
}
