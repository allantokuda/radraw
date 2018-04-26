import {
  RENAME_NODE,
  UPDATE_OPERATOR_PARAM
} from './actions'

// temporary
import initialState from './initial-state'

export default function reducer(state = initialState, action) {
  const changedNode = state.nodes.find(node => node.id === action.nodeId)

  return {
    nodes: state.nodes.map(node => {
      if (node.id === action.nodeId) {
        let changes
        switch (action.type) {
          case RENAME_NODE:
            changes = { relation: { name: action.name } }
            break
          case UPDATE_OPERATOR_PARAM:
            let val = {}
            val[action.paramName] = action.value
            changes = {
              operator: Object.assign({}, node.operator, {
                params: Object.assign({}, node.operator.params, val)
              })
            }
            break
          default:
            changes = {}
        }
        return Object.assign({}, node, changes)
      }
      return node
    }),
    arrows: state.arrows.map(arrow => {
      if (arrow.from === action.nodeId) {
        return Object.assign({}, arrow, { x1: changedNode.x, y1: changedNode.y })
      } else if (arrow.to === action.nodeId) {
        return Object.assign({}, arrow, { x2: changedNode.x, y2: changedNode.y })
      }
      return arrow
    })
  }
}
