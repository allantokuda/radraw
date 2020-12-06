import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { act } from 'react-dom/test-utils'
import raApp from './reducers/index'
import { Provider } from 'react-redux'
import RelationBox from './RelationBox'

let store
let container

beforeEach(() => {
  store = createStore(raApp)
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

const render = (element) => {
  ReactDOM.render(
    <Provider store={store}>
      { element }
    </Provider>, container
  )
}

let operator = { type: 'Project', params: '' }
let node = { id: 1, operator }
let relation = { name: 'Foobar' }
let state = { editor: {} }

const expectSelectedInStore = (value, nodeId = 1) => {
  expect(store.getState().nodes.find(node => node.id === nodeId).selected).toEqual(value)
}

it('can click to select a relation', () => {
  render(<RelationBox { ... { node, operator, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expectSelectedInStore(undefined)
  act(() => { field.dispatchEvent(new MouseEvent('click', {bubbles: true})) })
  expectSelectedInStore(true)
})

it('keeps relation uneditable when not selected', () => {
  render(<RelationBox { ... { node, operator, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expect(field.getAttribute('contenteditable')).toEqual('false')
})

it('makes relation editable when selected', () => {
  node.selected = true
  render(<RelationBox { ... { node, operator, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expect(field.getAttribute('contenteditable')).toEqual('true')
  // TODO: try to test the focusing of the field
  // act(() => { field.dispatchEvent(new MouseEvent('click', {bubbles: true})) })
  // expect(document.activeElement).toEqual(field)
})


