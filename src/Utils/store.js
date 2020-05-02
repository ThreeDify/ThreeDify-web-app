const STORAGE_KEY = 'state';

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
}

export function loadPersistedState() {
  try {
    let state = localStorage.getItem(STORAGE_KEY);
    if (!state) return undefined;
    return JSON.parse(state);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}
