import {
  RENAME_NODE,
  UPDATE_OPERATOR_PARAM
} from '../actions'

// temporary
const initialState = [
  {
    id: 1,
    operator: {},
    relation: {
      name: 'Achievement'
    }
  },
  {
    id: 2,
    operator: {
      type: 'Match Join',
      shape: 'HalfHouseRight',
      params: {
        Aid: ['XYZ_Skill_code'],
        Bid: ['Skill_code'],
        Carry: ['ABC']
      }
    },
    relation: {
      id: 5,
      name: 'Achievement with Skill data'
    }
  }
]

export default function nodes(state = initialState, action) {
  switch (action.type) {
    case RENAME_NODE:
      return state.map(node => {
        if (node.id === action.nodeId) {
          return Object.assign({}, node, {
            relation: { name: action.name }
          })
        }
        return node;
      });

    case UPDATE_OPERATOR_PARAM:
      return state.map(node => {
        if (node.id === action.nodeId) {
          let val = {}
          val[action.paramName] = action.value
          return (
            Object.assign({}, node, { operator:
              Object.assign({}, node.operator, { params:
                Object.assign({}, node.operator.params, val)
              })
            })
          )
        }
        return node;
      });

    default:
      return state
  }
}
