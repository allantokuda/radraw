import {
  MOVE_NODE
} from '../actions'

// temporary
const initialState = [
  {
    id: 1,
    x: 100, y: 100,
    operator: {},
    relation: {
      name: 'Achievement'
    }
  },
  {
    id: 2,
    x: 100,
    y: 200,
    operator: {
      type: 'Match Join',
      shape: 'HalfHouseRight',
      text: "Aid(S): Skill_code\nBid(E): Skill_code"
    },
    relation: {
      id: 5,
      name: 'Achievement with Skill data'
    }
  }
]

export default function nodes(state = initialState, action) {
  switch (action.type) {
    case MOVE_NODE:
      return state.map((node, nodeId) => {
        if (node.id === nodeId) {
          node.x += action.dx;
          node.y += action.dy;
        }
      });
    default:
      return state
  }
}
