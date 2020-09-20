import reducer from './arrows'
import * as actions from '../actions'
import { REDUCE } from '../operators'

describe('arrows reducer', () => {

  it('updates arrows when destination nodes move', () => {
    let nodes = [
      { id: 1, x: 100, y:   0, operator: {} },
      { id: 2, x: 200, y:   0, operator: {} },
      { id: 3, x: 150, y: 200, operator: { type: 'HalfHouseLeft', width: 160, height: 120 } }
    ]
    let arrows = [
      { from: 1, to: 3, connection: 0 },
      { from: 2, to: 3, connection: 1 },
    ]
    let action = {
      type: actions.MOVE_NODE,
      nodeId: 3,
    }

    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3, connection: 0, x2: 71, y2: 200 },
      { from: 2, to: 3, connection: 1, x2: 229, y2: 200 }
    ])
  })

  it('handles relation deselectAll operation without error even though there is no associated node', () => {
    let nodes = [
      { id: 1, relation: {} },
      { id: 2, relation: {} },
      { id: 3, relation: {} },
    ]
    let arrows = [
      { from: 1, to: 3, connection: 0 },
      { from: 2, to: 3, connection: 1 },
    ]
    let action = {
      type: actions.DESELECT_ALL
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3, connection: 0 },
      { from: 2, to: 3, connection: 1 }
    ])
  })

  it('adds arrow to newly created unary operator', () => {
    let editor = {
      selectedRelationNodeIds: [1]
    }
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {} },
      { id: 2, x: 100, y: 300, height: 120, relation: {} }, // last node should have been created in the same ADD_OPERATOR action
    ]
    let arrows = []
    let action = {
      type: actions.ADD_OPERATOR,
      operatorType: REDUCE
    }
    expect(
      reducer({ editor, nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 2, connection: 0, x1: 100, y1: 220, x2: 100, y2: 300 },
    ])
  })
})
