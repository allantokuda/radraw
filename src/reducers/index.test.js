import reducer from './index'

describe('index reducer', () => {
  it('should reset to the initial state for new action', () => {
    let state = reducer({ foo: 'bar' }, { type: 'NEW_CHART' })
    expect(state.id.length).toEqual(36)
    expect(state.editor.action).toEqual('select')
  })

  it('keeps existing uuid along with existing chart data', () => {
    let existingState = {
      id: '123456-7890-4123-4567-890123456',
      name: 'Cool Chart',
      editor: { action: 'select' },
      nodes: [ { x: 3, y: 4, operator: {} } ],
      arrows: [],
      relations: [ { name: 'foo' } ]
    }
    let state = reducer(existingState, {})
    expect(state).toEqual(existingState)
  })
})
