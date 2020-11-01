import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import reducer from './Reducers/index';
import { persistState, loadPersistedState } from '../Utils/store';

const store = createStore(
  reducer,
  loadPersistedState(),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true })
  )
);

store.subscribe(() => {
  persistState(store.getState());
});

export default store;
