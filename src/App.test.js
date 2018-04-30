import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux'
import raApp from './reducers/index'

const store = createStore(raApp)

import { Provider } from 'react-redux'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});
