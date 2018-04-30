import reducer from './editor'
import * as actions from '../actions'

describe('editor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      action: 'select'
    })
  })

  it('should allow a node to be selected for subsequent operations', () => {
    expect(
      reducer(
        {
          editor: { action: 'select' },
          nodes: [
            { id: 3, relation: { name: 'ABC' }}
          ]
        },
        {
          type: actions.SELECT_RELATION,
          nodeId: 3
        }
      )
    ).toEqual({
      action: 'select',
      selectedRelation: 3
    })
  })
})
