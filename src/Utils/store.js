const STORAGE_KEY = 'state';

function getStatesToSave(state) {
  return {
    auth: {
      userToken: state.auth.userToken,
      isLoggedIn: state.auth.isLoggedIn,
    },
  };
}

export function persistState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getStatesToSave(state)));
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
