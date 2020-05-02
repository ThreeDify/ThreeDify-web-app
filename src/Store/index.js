import { createStore } from 'redux';
import reducer from './Reducers/index';
import { persistState, loadPersistedState } from '../Utils/store';

const store = createStore(
  reducer,
  loadPersistedState(),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  persistState(store.getState());
});

export default store;
