import reducer from './editor'
import * as actions from '../actions'

describe('editor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      action: 'select'
    })
  })
})
