import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'
import PrecedenceChart from './PrecedenceChart';
import { createStore } from 'redux'
import raApp from './reducers/index'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux'
import * as actions from './actions'

const mockStore = configureStore([])
let store = mockStore({
  editor: { selectedRelationNodeIds: [7] },
  nodes: [ { id: 7, operator: { params: {} }, resultRelationId: 1 } ],
  arrows: [],
  relations: [ { id: 1, name: 'Test Relation' } ]
})
store.dispatch = jest.fn();

let container;
let chart;

beforeEach(() => {
  container = document.createElement('div');
  act(() => {
    ReactDOM.render(
      <Provider store={store}>
        <PrecedenceChart />
      </Provider>, container
    )
  })
  chart = container.querySelector('.precedenceChart')
})

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
})


it('renders relation', () => {
  const relations = Array.from(chart.querySelectorAll('.relation'))
  expect(relations[0].innerHTML).toMatch('Test Relation')
  expect(relations.length).toEqual(1)
});

/*
TODO: WIP test, cannot get the action to dispatch...
it('deselects on canvas click', () => {
  act(() => {
    chart.dispatchEvent(new MouseEvent('click', { 'screenX': 1, 'screenY': 1 }), { bubbles: true });
  })
  expect(store.dispatch).toHaveBeenCalledWith(
    actions.deselectAll({ payload: 'sample text' })
  );
});
*/
