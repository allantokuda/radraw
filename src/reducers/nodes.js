import * as actions from '../actions'
import { maxPlusOne } from './index'
import { operatorTypeProperties } from '../operators'
import { flip } from '../operatorShape'
import operator from './operator'

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

    default:
      changes = {}
  }

  const operatorChanges = { operator: operator(node.operator, action) }

  return Object.assign({}, node, operatorChanges, changes)
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
      let selectedRelationNodes = state.nodes.filter(node => node.selected)
      let averageX = average(selectedRelationNodes.map(node => node.x))
      let bottomY = Math.max(...selectedRelationNodes.map(node => node.y + node.height))

      const operatorProperties = operatorTypeProperties(action.operatorType)

      nodes = nodes.map(node => Object.assign({}, node, { selected: false })).concat({
        id: maxPlusOne(state.nodes),
        resultRelationId: maxPlusOne(state.relations),
        operator: {
          type: action.operatorType,
          shape: operatorProperties.shape,
          params: operatorProperties.defaultParams
        },
        x: averageX,
        y: bottomY + 30,
        selected: true
      })
      break

    case 'SELECT':
      if (state.editor.noSelectAfterDrag) break
      nodes = state.nodes.map(node => Object.assign({}, node, { selected: node.id === action.selectableId }))
      break

    case 'TOGGLE_SELECT':
      nodes = state.nodes.map(node => {
        if (action.selectableId !== node.id) return node
        return Object.assign({}, node, { selected: !node.selected })
      })
      break

    case 'DELETE_SELECTED':
      nodes = state.nodes.filter(node => !node.selected)
      break

    case 'DESELECT_ALL':
      nodes = state.nodes.map(node => Object.assign({}, node, { selected: false }))
      break

    case 'FLIP_OPERATOR':
      nodes = state.nodes.map(node => {
        if (node.selected) {
          const operator = Object.assign({}, node.operator, { shape: flip(node.operator.shape) })
          return Object.assign({}, node, { operator })
        } else {
          return node
        }
      })
      break
    
    default:

  }
  
  return nodes
}

