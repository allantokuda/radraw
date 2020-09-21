import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import raApp from './reducers/index'
import { loadState, saveState } from './lib/localStorage'
import throttle from './lib/throttle';

const persistedState = loadState()
const store = createStore(raApp, persistedState)

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 500));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
