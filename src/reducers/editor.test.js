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

  it('can select a relation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [] } },
        { type: 'SELECT_RELATION', nodeId: 7 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7]
    })
  })

  it('can change the selected relation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [6] } },
        { type: 'SELECT_RELATION', nodeId: 7 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7]
    })
  })

  it('can toggle-select a second relation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [7] } },
        { type: 'TOGGLE_SELECT_RELATION', nodeId: 8 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7, 8]
    })
  })

  it('can toggle-deselect a relation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [6, 7] } },
        { type: 'TOGGLE_SELECT_RELATION', nodeId: 7 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [6]
    })
  })

  it('can toggle-deselect one of several relations', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [7, 8, 9] } },
        { type: 'TOGGLE_SELECT_RELATION', nodeId: 8 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7, 9]
    })
  })

  it('avoids changing the selection at mouseup on end of drag operation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [7], noSelectAfterDrag: true } },
        { type: 'SELECT_RELATION', nodeId: 8 } // dragging a not-selected node
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7]
    })
  })

  it('selects the newest relation after creating an operator', () => {
    expect(
      reducer(
        {
          editor: { action: 'select', selectedRelationNodeIds: [6] },
          nodes: [
            { id: 6, x: 100, y: 200, resultRelationId: 1 },
            { id: 7, x: 100, y: 400, resultRelationId: 2 } // assumed new node+relation
          ],
          relations: [{ id: 2 }, { id: 3 }]
        },
        { type: 'ADD_OPERATOR' }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [7]
    })
  })

  it('remembers a flag to not select at the end of a drag operation', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [] } },
        { type: 'MOVE_NODE' }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: [],
      noSelectAfterDrag: true
    })
  })

  it('clears selection upon delete', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [4, 5] } },
        { type: 'DELETE_SELECTED' }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: []
    })
  })

  it('remembers an operator input connection for subsequently adding an input arrow', () => {
    expect(
      reducer(
        { editor: { action: 'select', selectedRelationNodeIds: [] } },
        { type: 'INIT_CONNECT', nodeId: 3, connection: 1 }
      )
    ).toEqual({
      action: 'connect',
      selectedRelationNodeIds: [],
      connectTo: { nodeId: 3, connection: 1 }
    })
  })

  it('resets to select mode when connecting', () => {
    expect(
      reducer(
        { editor: { action: 'connect', connectTo: { foo: 'bar' }, selectedRelationNodeIds: [] } },
        { type: 'FINISH_CONNECT', sourceNodeId: 3 }
      )
    ).toEqual({
      action: 'select',
      selectedRelationNodeIds: []
    })
  })
})
