import reducer from './editor'
import * as actions from '../actions'
import operators from '../operators'

describe('editor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      action: 'select',
      allowedOperations: operators
    })
  })

  it('should offer allowed operations when one relation is selected', () => {
    expect(
      reducer({
        nodes: [
          { id: 1, relation: { name: 'A', selected: true } },
          { id: 2, relation: { name: 'B', selected: false } },
        ],
        editor: {
          action: 'select'
        }
      }, {
      })
    ).toEqual({
      action: 'select',
      allowedOperations: operators
    })
  })
})
