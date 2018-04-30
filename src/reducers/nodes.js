import * as actions from '../actions'

const selectionChange = (node, operatorSelected, relationSelected) => {
  return {
    operator: Object.assign({}, node.operator, { selected: operatorSelected }),
    relation: Object.assign({}, node.relation, { selected: relationSelected })
  }
}

export const updateNode = (node, action) => {
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

    case actions.SELECT_RELATION:
      changes = selectionChange(node, false, true)
      break

    default:
      changes = {}
  }

  return Object.assign({}, node, changes)
}

export default (nodes, action) => nodes.map(node => {
  if (node.id === action.nodeId) {
    return updateNode(node, action)
  } else if (action.type === actions.SELECT_RELATION) {
    return Object.assign({}, node, selectionChange(node, false, false))
  }
  return node
})

