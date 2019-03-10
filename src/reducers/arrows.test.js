import reducer from './arrows'
import * as actions from '../actions'

describe('arrows reducer', () => {

  it('updates arrows when destination nodes move', () => {
    expect(
      reducer({
        nodes: [
          { id: 1, x: 100, y:   0, operator: {} },
          { id: 2, x: 200, y:   0, operator: {} },
          { id: 3, x: 150, y: 200, operator: { type: 'HalfHouseLeft', width: 160, height: 120 } }
        ],
        arrows: [
          { from: 1, to: 3, connection: 0 },
          { from: 2, to: 3, connection: 1 },
        ]
      }, {
        type: actions.MOVE_NODE,
        nodeId: 3,
        dx: 33,
        dy: 22
      })
    ).toEqual([
      { from: 1, to: 3, connection: 0, x2: 104, y2: 222 },
      { from: 2, to: 3, connection: 1, x2: 262, y2: 222 }
    ])
  })

  it('handles relation deselectAll operation without error even though there is no associated node', () => {
    expect(
      reducer({
        nodes: [
          { id: 1, relation: { selected: false } },
          { id: 2, relation: { selected: true } },
          { id: 3, relation: { selected: false } },
        ],
        arrows: [
          { from: 1, to: 3, connection: 0 },
          { from: 2, to: 3, connection: 1 },
        ]
      }, {
        type: actions.DESELECT_ALL,
      })
    ).toEqual([
      { from: 1, to: 3, connection: 0 },
      { from: 2, to: 3, connection: 1 }
    ])
  })
})
