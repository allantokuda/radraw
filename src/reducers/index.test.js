import reducer from './index'

describe('index reducer', () => {
  it('should reset to the initial state for new action', () => {
    let state = reducer({ foo: 'bar' }, { type: 'NEW_CHART' })
    expect(state.editor.action).toEqual('select')
  })
})
