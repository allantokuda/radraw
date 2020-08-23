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


  it('should not change editor action when no dispatch action', () => {
    expect(
      reducer(
        { editor: { action: 'select' } },
        {}
      ).action
    ).toEqual('select')
  })

  it('should switch to relation mode', () => {
    expect(
      reducer(
        { editor: { action: 'select' } },
        { type: 'NEW_RELATION_MODE' }
      ).action
    ).toEqual('new_relation')
  })

  it('should switch back to select mode', () => {
    expect(
      reducer(
        { editor: { action: 'new_relation' } },
        { type: 'CREATE_RELATION' }
      ).action
    ).toEqual('select')
  })
})
