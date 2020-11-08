import reducer from './editor'
import * as actions from '../actions'
import operators from '../operators'

describe('editor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      action: 'select'
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
      action: 'select'
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
      ).action).toEqual('new_relation')
  })

  it('should switch back to select mode', () => {
    expect(
      reducer(
        { editor: { action: 'new_relation' } },
        { type: 'CREATE_RELATION' }
      ).action
    ).toEqual('select')
  })

  it('at end of drag operation, clears flag for avoiding select at mouseup', () => {
    expect(
      reducer(
        { editor: { action: 'select', noSelectAfterDrag: true } },
        { type: 'SELECT', selectableId: 8 } // dragging a not-selected node
      )
    ).toEqual({
      action: 'select',
    })
  })

  it('remembers a flag to not select at the end of a drag operation', () => {
    expect(
      reducer(
        { editor: { action: 'select' } },
        { type: 'MOVE_NODE' }
      )
    ).toEqual({
      action: 'select',
      noSelectAfterDrag: true
    })
  })

  it('remembers an operator input connection for subsequently adding an input arrow', () => {
    expect(
      reducer(
        { editor: { action: 'select' } },
        { type: 'INIT_CONNECT', nodeId: 3, connection: 1 }
      )
    ).toEqual({
      action: 'connect',
      connectTo: { nodeId: 3, connection: 1 }
    })
  })

  it('resets to select mode when connecting', () => {
    expect(
      reducer(
        { editor: { action: 'connect', connectTo: { foo: 'bar' }, } },
        { type: 'FINISH_CONNECT', sourceNodeId: 3 }
      )
    ).toEqual({ action: 'select' })
  })

  it('opens file browse', () => {
    expect(
      reducer(
        { editor: { action: 'select', } },
        { type: 'BROWSE' }
      )
    ).toEqual({ action: 'open' })
  })
})
