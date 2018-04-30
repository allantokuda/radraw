import * as actions from '../actions'

export const updatedNode = (node, action) => {
  let changes

  switch (action.type) {
    case actions.MOVE_NODE:
      changes = { x: node.x + action.dx, y: node.y + action.dy }
      break

    case actions.RENAME_NODE:
      changes = { relation: { name: action.name } }
      break

    case actions.RESIZE_NODE:
      let hasOperator = node.operator && node.operator.type !== undefined
      changes = {
        height: action.nodeHeight,
        operator: hasOperator ? Object.assign({}, node.operator, {
          width: action.operatorWidth,
          height: action.operatorHeight
        }) : {}
      }
      break

    case actions.UPDATE_OPERATOR_PARAM:
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

export default (nodes, action) => nodes.map(node => {
  if (node.id === action.nodeId) {
    return updatedNode(node, action)
  }
  return node
})

