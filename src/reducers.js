import {
  MOVE_NODE,
  RENAME_NODE,
  RESIZE_NODE,
  UPDATE_OPERATOR_PARAM
} from './actions'

import { connectionPoints } from './operatorShape'

// temporary
import initialState from './initial-state'

const nodes = (state, action) => state.nodes.map(node => {
  if (node.id === action.nodeId) {
    let changes
    switch (action.type) {
      case MOVE_NODE:
        changes = { x: node.x + action.dx, y: node.y + action.dy }
        break

      case RENAME_NODE:
        changes = { relation: { name: action.name } }
        break

      case RESIZE_NODE:
        let hasOperator = Object.keys(node.operator).length > 0
        changes = {
          height: action.nodeHeight,
          operator: hasOperator ? Object.assign({}, node.operator, {
            width: action.operatorWidth,
            height: action.operatorHeight
          }) : {}
        }
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
})

const arrows = (state, action) => {
  const changedNode = state.nodes.find(node => node.id === action.nodeId)
  return state.arrows.map(arrow => {
    if (arrow.from === action.nodeId) {
      return Object.assign({}, arrow, { x1: changedNode.x, y1: changedNode.y + (changedNode.height || 0) })
    } else if (arrow.to === action.nodeId) {
      let points = connectionPoints(changedNode.operator)
      let connectionPoint = points[arrow.connection]
      return Object.assign({}, arrow, { x2: changedNode.x + connectionPoint.x, y2: changedNode.y + connectionPoint.y })
    }
    return arrow
  })
}

export default function reducer(state = initialState, action) {
  //console.log(state)
  return {
    nodes: nodes(state, action),
    arrows: arrows(state, action)
  }
}
