import * as actions from '../actions'
import { maxPlusOne } from './index'
import { operatorShape } from '../operators'

function average(nums) {
  return nums.reduce((a, b) => (a + b)) / nums.length;
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

    default:
      changes = {}
  }

  return Object.assign({}, node, changes)
}

export default (state, action) => {
  let nodes = state.nodes.map(node => {
    if (node.id === action.nodeId) {
      return updateNode(node, action)
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
      if (numOperatorInputs(action.operatorType) === state.editor.selectedRelationNodeIds.length) {
      }
      */
      let selectedRelationNodes = state.editor.selectedRelationNodeIds.map(relationId =>
        state.nodes.find(node => node.id === relationId)
      )
      let averageX = average(selectedRelationNodes.map(node => node.x))
      let bottomY = Math.max(...selectedRelationNodes.map(node => node.y + node.height))

      nodes = nodes.concat(
      {
        id: maxPlusOne(state.nodes),
        resultRelationId: maxPlusOne(state.relations),
        operator: { type: action.operatorType, shape: operatorShape(action.operatorType) },
        x: averageX,
        y: bottomY + 30
      })
      break
    
    default:

  }

  
  return nodes
}

