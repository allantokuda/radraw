import reducer from './nodes'
import * as actions from '../actions'
import { REDUCE, MATCH_JOIN } from '../operators'

describe('node reducer', () => {
  xit('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      nodes: [],
      arrows: []
    })
  })

  it('should move a node', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 7, x: 100, y: 100, relation: { name: 'Alice' } },
            { id: 8, x: 200, y: 200, relation: { name: 'Eve'   } },
            { id: 9, x: 300, y: 300, relation: { name: 'Bob'   } },
          ]
        },
        {
          type: actions.MOVE_NODE,
          nodeId: 8,
          dx: 33,
          dy: 44
        }
      )
    ).toEqual([
      { id: 7, x: 100, y: 100, relation: { name: 'Alice' } },
      { id: 8, x: 233, y: 244, relation: { name: 'Eve'   } },
      { id: 9, x: 300, y: 300, relation: { name: 'Bob'   } },
    ])
  })

  it('should rename a node', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 1, x: 100, y: 100, relation: { name: 'Alice' } },
            { id: 5, x: 200, y: 200, relation: { name: 'Eve'   } },
            { id: 2, x: 300, y: 300, relation: { name: 'Bob'   } },
          ]
        },
        {
          type: actions.RENAME_RELATION,
          nodeId: 5,
          name: 'Evelyn',
        }
      )
    ).toEqual([
      { id: 1, x: 100, y: 100, relation: { name: 'Alice'  } },
      { id: 5, x: 200, y: 200, relation: { name: 'Evelyn' } },
      { id: 2, x: 300, y: 300, relation: { name: 'Bob'    } },
    ])
  })

  it('should resize a node with an operator', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 1, x: 0, },
            { id: 5, x: 1, operator: { type: 'xyz' }},
            { id: 2, x: 2, },
          ]
        },
        {
          type: actions.RESIZE_NODE,
          nodeId: 5,
          nodeHeight: 345,
          operatorWidth: 234,
          operatorHeight: 123
        }
      )
    ).toEqual([
      { id: 1, x: 0 },
      { id: 5, x: 1, height: 345, operator: { type: 'xyz', width: 234, height: 123 } },
      { id: 2, x: 2 }
    ])
  })

  it('should on resize take only the node height for a node with no operator', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 1, x: 0, },
            { id: 5, x: 1, },
            { id: 2, x: 2, },
          ]
        },
        {
          type: actions.RESIZE_NODE,
          nodeId: 5,
          nodeHeight: 345,
          operatorWidth: 234,
          operatorHeight: 123
        }
      )
    ).toEqual([
      { id: 1, x: 0 },
      { id: 5, x: 1, height: 345, operator: {}},
      { id: 2, x: 2 }
    ])
  })

  it('should allow operator text to be updated', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 1, x: 0, operator: { params: 'Aid(E): Skill_code\nBid(E): Skill_code' } }
          ]
        },
        {
          type: actions.UPDATE_OPERATOR_PARAMS,
          nodeId: 1,
          value: 'Aid(E): Skill_code\nBid(E): Least_Aspired_to_skill_code'
        }
      )
    ).toEqual([
      { id: 1, x: 0, operator: { params: 'Aid(E): Skill_code\nBid(E): Least_Aspired_to_skill_code' }}
    ])
  })

  it('adds a first relation node', () => {
    expect(
      reducer(
        { nodes: [], relations: [] },
        { type: 'CREATE_RELATION', x: 100, y: 200 }
      )
    ).toEqual([
      { id: 1, operator: {}, resultRelationId: 1, x: 100, y: 200 }
    ])
  })

  it('adds a second relation node', () => {
    expect(
      reducer(
        { nodes: [{ id: 7, resultRelationId: 13 }], relations: [{ id: 13 }] },
        { type: 'CREATE_RELATION', x: 100, y: 200 }
      )
    ).toEqual([
      { id: 7, resultRelationId: 13 },
      { id: 8, resultRelationId: 14, operator: {}, x: 100, y: 200 }
    ])
  })

  it('adds a new unary operator node with default params at a Y coordinate that below the operand relation', () => {
    expect(
      reducer(
        {
          relations: [{ id: 13 }],
          nodes: [{ id: 7, resultRelationId: 13, x: 100, y: 200, height: 350 }],
          editor: { selectedRelationNodeIds: [7] }
        },
        { type: 'ADD_OPERATOR', operatorType: REDUCE }
      )
    ).toEqual([
      { id: 7, resultRelationId: 13, x: 100, y: 200, height: 350 },
      { id: 8, resultRelationId: 14, operator: { shape: "Hexagon", type: "Reduce", params: 'id: ' }, x: 100, y: 580 }
    ])
  })

  it('adds a new binary operator node with default params under and between the operand relations', () => {
    expect(
      reducer(
        {
          relations: [{ id: 13 }, {id: 14 }],
          nodes: [
            { id: 7, resultRelationId: 13, x: 100, y: 200, height: 300 },
            { id: 8, resultRelationId: 14, x: 300, y: 220, height: 330 }
          ],
          editor: { selectedRelationNodeIds: [7, 8] }
        },
        { type: 'ADD_OPERATOR', operatorType: MATCH_JOIN }
      )
    ).toEqual([
      { id: 7, resultRelationId: 13, x: 100, y: 200, height: 300 },
      { id: 8, resultRelationId: 14, x: 300, y: 220, height: 330 },
      { id: 9, resultRelationId: 15, operator: { shape: "HalfHouseLeft", type: "Match Join", params: 'Aid(): \nBid(): ' }, x: 200, y: 580 }
    ])
  })

  it('deletes selected nodes', () => {
    expect(
      reducer(
        {
          relations: [{ id: 13 }, {id: 14 }],
          nodes: [
            { id: 6, resultRelationId: 13, x: 100, y: 200, height: 300 },
            { id: 7, resultRelationId: 14, x: 100, y: 200, height: 300 },
            { id: 8, resultRelationId: 15, x: 100, y: 200, height: 300 },
            { id: 9, resultRelationId: 16, x: 100, y: 200, height: 300 }
          ],
          editor: { selectedRelationNodeIds: [7, 9] }
        },
        { type: 'DELETE_SELECTED' }
      )
    ).toEqual([
      { id: 6, resultRelationId: 13, x: 100, y: 200, height: 300 },
      { id: 8, resultRelationId: 15, x: 100, y: 200, height: 300 }
    ])
  })

  it('flips flippable operator', () => {
    expect(
      reducer(
        {
          relations: [{ id: 13 }, {id: 14 }],
          nodes: [
            { id: 6, resultRelationId: 13, operator: { shape: 'HalfHouseLeft' } },
          ],
          editor: { selectedRelationNodeIds: [6] }
        },
        { type: 'FLIP_OPERATOR' }
      )
    ).toEqual([
      { id: 6, resultRelationId: 13, operator: { shape: 'HalfHouseRight' } },
    ])

  })
})
