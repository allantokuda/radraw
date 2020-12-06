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
  render(<RelationBox { ... { node, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expectSelectedInStore(undefined)
  act(() => { field.dispatchEvent(new MouseEvent('click', {bubbles: true})) })
  expectSelectedInStore(true)
})

it('can tap to select a relation', () => {
  render(<RelationBox { ... { node, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expectSelectedInStore(undefined)
  act(() => { field.dispatchEvent(new TouchEvent('touchstart', {bubbles: true})) })
  expectSelectedInStore(true)
})

it('keeps relation uneditable when not selected', () => {
  render(<RelationBox { ... { node, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expect(field.getAttribute('contenteditable')).toEqual('false')
})

it('makes relation editable when selected', done => {
  node.selected = true
  render(<RelationBox { ... { node, relation, state } } />)
  let field = container.querySelector('[contenteditable]')
  expect(field.getAttribute('contenteditable')).toEqual('true')
  // TODO: try to test the focusing of the field
  // act(() => { field.dispatchEvent(new MouseEvent('click', { bubbles: true })) })
  // setTimeout((() => {
  //   expect(document.activeElement).toEqual(field)
     done()
  // }), 1000)
})

fit('allows multi-touch select', () => {
  ReactDOM.render(
    <Provider store={store}>
      <RelationBox { ... { node: { id: 1, operator }, relation: { name: 'Relation 1' }, state } } />
      <RelationBox { ... { node: { id: 2, operator }, relation: { name: 'Relation 2' }, state } } />
    </Provider>, container
  )

  let fields = Array.from(container.querySelectorAll('[contenteditable]'))
  let field1 = fields.find(field => field.innerHTML === 'Relation 1')
  let field2 = fields.find(field => field.innerHTML === 'Relation 2')

  expectSelectedInStore(undefined, 1)
  expectSelectedInStore(undefined, 2)

  act(() => { field1.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(false, 2)

  // MULTI-TOUCH moment
  act(() => { field2.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [{}, {}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(true, 2)

  act(() => { field1.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(true, 2)

  act(() => { field2.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(true, 2)

  act(() => { field2.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(false, 1)
  expectSelectedInStore(true, 2)

  act(() => { field2.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(false, 1)
  expectSelectedInStore(true, 2)

  act(() => { field1.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(false, 2)

  act(() => { field1.dispatchEvent(new TouchEvent('touchend', { bubbles: true, touches: [{}] })) })
  expectSelectedInStore(true, 1)
  expectSelectedInStore(false, 2)
})

