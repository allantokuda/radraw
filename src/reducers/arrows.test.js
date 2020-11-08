import reducer from './arrows'
import * as actions from '../actions'
import { REDUCE, TIMES } from '../operators'

describe('arrows reducer', () => {

  it('updates arrows when destination nodes move', () => {
    let nodes = [
      { id: 1, x: 100, y:   0, operator: {} },
      { id: 2, x: 200, y:   0, operator: {} },
      { id: 3, x: 150, y: 200, operator: { shape: 'HalfHouseLeft', width: 160, height: 120 } }
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
      { from: 2, to: 3, connection: 1, x2: 229, y2: 231.6 }
    ])
  })

  it('handles relation deselectAll operation without error even though there is no associated node', () => {
    let nodes = [
      { id: 1, relation: {} },
      { id: 2, relation: {} },
      { id: 3, relation: {} },
    ]
    let arrows = [
      { from: 1, to: 3, connection: 0, selected: true },
      { from: 2, to: 3, connection: 1, selected: true },
    ]
    let action = {
      type: actions.DESELECT_ALL
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3, connection: 0, selected: false },
      { from: 2, to: 3, connection: 1, selected: false }
    ])
  })

  it('adds arrow to newly created unary operator', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {}, selected: true },
      { id: 2, x: 100, y: 300, height: 120, operator: { shape: 'Hexagon', width: 100, height: 100 } }, // last node should have been created in the same ADD_OPERATOR action
    ]
    let arrows = []
    let action = {
      type: actions.ADD_OPERATOR,
      operatorType: REDUCE
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 2, connection: 0, x1: 100, y1: 220, x2: 100, y2: 300 },
    ])
  })

  it('adds arrows to newly created binary operator', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {}, selected: true },
      { id: 2, x: 300, y: 100, height: 130, relation: {}, selected: true },
      { id: 3, x: 200, y: 460, height: 100, operator: { type: 'Times', shape: 'FullHouseLeft', width: 200, height: 100 } }, // last node should have been created in the same ADD_OPERATOR action
    ]
    let arrows = []
    let action = {
      type: actions.ADD_OPERATOR,
      operatorType: TIMES
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3, connection: 0, x1: 100, x2: 101, y1: 220, y2: 499.6 },
      { from: 2, to: 3, connection: 1, x1: 300, x2: 299, y1: 230, y2: 499.6 },
    ])
  })

  it('flips arrows on binary operator', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, operator: {} },
      { id: 2, x: 300, y: 100, height: 130, operator: {} },
      { id: 3, x: 200, y: 460, height: 100, operator: { shape: 'HalfHouseLeft', width: 100, height: 100 }, selected: true },
    ]
    let arrows = [
      { from: 1, to: 3, x1: 100, y1: 0, x2: 200, y2: 100, connection: 0 },
      { from: 2, to: 3, x1: 400, y1: 0, x2: 300, y2: 142, connection: 1 },
    ]
    let action = {
      type: actions.FLIP_OPERATOR
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3, x1: 100, x2: 249, y1: 220, y2: 479.6, connection: 1 },
      { from: 2, to: 3, x1: 300, x2: 151, y1: 230, y2: 460, connection: 0 },
    ])
  })

  it('selects an arrow', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {} },
      { id: 2, x: 200, y: 460, height: 100, relation: {} },
      { id: 3, x: 300, y: 460, height: 100, relation: {} },
    ]
    let arrows = [
      { from: 1, to: 2, connection: 0, selected: false },
      { from: 1, to: 3, connection: 0, selected: true },
    ]
    let action = {
      type: actions.SELECT,
      selectableId: 'a2:0'
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 2, connection: 0, selected: true },
      { from: 1, to: 3, connection: 0, selected: false },
    ])
  })

  it('toggle-selects an arrow', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {} },
      { id: 2, x: 200, y: 460, height: 100, relation: {} },
      { id: 3, x: 300, y: 460, height: 100, relation: {} },
    ]
    let arrows = [
      { from: 1, to: 2, connection: 0, selected: false },
      { from: 1, to: 3, connection: 0, selected: true },
    ]
    let action = {
      type: actions.TOGGLE_SELECT,
      selectableId: 'a2:0'
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 2, connection: 0, selected: true },
      { from: 1, to: 3, connection: 0, selected: true },
    ])
  })

  it('deletes arrows and cleans up disconnected arrows', () => {
    let nodes = [
      { id: 1, x: 100, y: 100, height: 120, relation: {} },
      // supposing node 2 has been deleted
      { id: 3, x: 200, y: 460, height: 100, relation: {} },
      { id: 4, x: 300, y: 280, height: 100, relation: {} },
    ]
    let arrows = [
      { from: 1, to: 2 },
      { from: 2, to: 3 },
      { from: 1, to: 3 },
      { from: 1, to: 4, connection: 0, selected: true },
    ]
    let action = {
      type: actions.DELETE_SELECTED
    }
    expect(
      reducer({ nodes, arrows }, action)
    ).toEqual([
      { from: 1, to: 3 },
    ])

  })

  it('adds new arrow connecting to operator that is missing an input', () => {
    let editor = { action: 'connect', connectTo: { connection: 1, nodeId: 7 } }
    let nodes = [
      { id: 6, x: 200, y: 200, height: 100 },
      { id: 7, x: 300, y: 400, operator: { shape: 'HalfHouseRight', width: 100, height: 100 } }
    ]
    let arrows = []
    let action = {
      type: actions.FINISH_CONNECT,
      sourceNodeId: 6
    }
    expect(
      reducer({ editor, nodes, arrows }, action)
    ).toEqual([
      { from: 6, to: 7, x1: 200, x2: 251, y1: 300, y2: 419.6, connection: 1 },
    ])
  })
})
