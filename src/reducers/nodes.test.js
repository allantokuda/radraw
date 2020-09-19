import reducer from './nodes'
import * as actions from '../actions'
import { REDUCE } from '../operators'

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
            { id: 1, x: 0, operator: { params: { Aid: 'Skill_code' } } },
            { id: 2, x: 1, operator: { params: { Bid: 'Least_Aspired_to_skill_code' } } },
          ]
        },
        {
          type: actions.UPDATE_OPERATOR_PARAM,
          nodeId: 1,
          paramName: 'Aid',
          value: 'Achieved_skill_code'
        }
      )
    ).toEqual([
      { id: 1, x: 0, operator: { params: { Aid: 'Achieved_skill_code' } } },
      { id: 2, x: 1, operator: { params: { Bid: 'Least_Aspired_to_skill_code' } } },
    ])
  })


  it('should allow a relation to be selected (and auto-deselect other selected items) for subsequent operations', () => {
    expect(
      reducer(
        {
          nodes: [
              { id: 3, operator: { type: 'XYZ', selected: true }, relation: { name: 'ABC', selected: true }},
              { id: 4, operator: { type: 'QRS', selected: true }, relation: { name: 'DEF' }},
              { id: 5, operator: { type: 'TUV'                 }, relation: { name: 'GHI', selected: true }}
          ]
        },
        {
          type: actions.SELECT_RELATION,
          nodeId: 4
        }
      )
    ).toEqual([
      { id: 3, operator: { type: 'XYZ', selected: false, }, relation: { name: 'ABC', selected: false }},
      { id: 4, operator: { type: 'QRS', selected: false, }, relation: { name: 'DEF', selected: true }},
      { id: 5, operator: { type: 'TUV', selected: false, }, relation: { name: 'GHI', selected: false }}
    ])
  })

  it('should allow all relations to be deselected', () => {
    expect(
      reducer(
        {
          nodes: [
            { id: 3, operator: { type: 'XYZ', selected: true  }, relation: { name: 'ABC', selected: false }},
            { id: 4, operator: { type: 'QRS', selected: false }, relation: { name: 'DEF', selected: true }},
            { id: 5, operator: { type: 'TUV', selected: false }, relation: { name: 'GHI', selected: false }}
          ]
        },
        {
          type: actions.DESELECT_ALL
        }
      )
    ).toEqual([
      { id: 3, operator: { type: 'XYZ', selected: false, }, relation: { name: 'ABC', selected: false }},
      { id: 4, operator: { type: 'QRS', selected: false, }, relation: { name: 'DEF', selected: false }},
      { id: 5, operator: { type: 'TUV', selected: false, }, relation: { name: 'GHI', selected: false }}
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

  it('adds a new operator node at a Y coordinate that below the operand relation', () => {
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
      { id: 8, resultRelationId: 14, operator: { shape: "Hexagon", type: "Reduce" }, x: 100, y: 580 }
    ])

  })
})
