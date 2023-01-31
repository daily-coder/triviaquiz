export function loadState(key: string) {
  try {
    const serializedData = localStorage.getItem(key);
    if (serializedData === null) {
      return undefined;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return undefined;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function saveState(key: string, value: any) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
