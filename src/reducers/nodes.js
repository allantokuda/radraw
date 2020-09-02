import * as actions from '../actions'
import { maxPlusOne } from './index'
import { operatorShape } from '../operators'

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

    case actions.RENAME_RELATION:
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

    case actions.DESELECT_ALL:
      changes = selectionChange(node, false, true)
      break

    default:
      changes = {}
  }

  return Object.assign({}, node, changes)
}

export default (state, action) => {
  let nodes = state.nodes.map(node => {
    if (node.id === action.nodeId) {
      return updateNode(node, action)
    } else if (action.type === actions.SELECT_RELATION || action.type === actions.DESELECT_ALL) {
      return Object.assign({}, node, selectionChange(node, false, false))
    }
    return node
  })

  switch (action.type) {
    case 'CREATE_RELATION':
      let nextNodeId = Math.max(...state.nodes.map((node) => node.id))
      if (nextNodeId < 0) nextNodeId = 1

      nodes = nodes.concat({
        id: maxPlusOne(state.nodes),
        resultRelationId: maxPlusOne(state.relations),
        operator: {},
        x: action.x,
        y: action.y
      })
      break

    case 'ADD_OPERATOR':
      /* TODO cover this logic by selecting visible operators
      if (numOperatorInputs(action.operatorType) === state.editor.selectedRelationIds.length) {
      }
      */
      /* TODO: data model is wrong. Selecting relation boxes (on nodes), not relations. */
      let selectedRelationNodes = state.editor.selectedRelationIds.map(relationId =>
        state.nodes.find(node => node.resultRelationId === relationId)
      )
      nodes = nodes.concat({
        id: maxPlusOne(state.nodes),
        resultRelationId: maxPlusOne(state.relations),
        operator: { type: action.operatorType, shape: operatorShape(action.operatorType) },
        x: selectedRelationNodes[0].x,
        y: selectedRelationNodes[0].y + 120
      })
      break
    
    default:

  }

  
  return nodes
}

