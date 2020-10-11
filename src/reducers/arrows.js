import { connectionPoints } from '../operatorShape'

export default (state, action) => {
  if (state.arrows === undefined) {
    return []
  }

  let arrows
  let toNode
  let fromNode

  function newArrow(fromNode, toNode, connection) {
    const connectionPoint = connectionPoints(toNode.operator)[connection]
    return {
      from: fromNode.id,
      to: toNode.id,
      connection: connection,
      x1: fromNode.x,
      y1: fromNode.y + fromNode.height,
      x2: toNode.x + connectionPoint.x,
      y2: toNode.y + connectionPoint.y
    }
  }

  switch(action.type) {
    case 'ADD_OPERATOR':
      const fromNodes = state.editor.selectedRelationNodeIds.map(
        nodeId => state.nodes.find(node => node.id === nodeId)
      ).sort((n1, n2) => n1.x - n2.x)

      toNode = state.nodes.slice(-1)[0] // assume newly created node is last item in the array

      // Add 1 or 2 new arrows depending on cardinality of operator being added
      arrows = state.arrows.concat(
        fromNodes.map((fromNode, i) => newArrow(fromNode, toNode, i))
      )
      break

    case 'FINISH_CONNECT':
      fromNode = state.nodes.find(node => node.id === action.sourceNodeId)
      toNode = state.nodes.find(node => node.id === state.editor.connectTo.nodeId)
      arrows = [...state.arrows, newArrow(fromNode, toNode, state.editor.connectTo.connection)]
      break


    case 'DELETE_SELECTED':
      let existingNodeIds = state.nodes.map(node => node.id)
      arrows = state.arrows.filter(arrow =>
        existingNodeIds.indexOf(arrow.to) !== -1 &&
        existingNodeIds.indexOf(arrow.from) !== -1
      )
      break

    case 'FLIP_OPERATOR':
      const flipNodeId = state.editor.selectedRelationNodeIds[0]
      const flipNode = state.nodes.find(node => node.id === flipNodeId)

      arrows = state.arrows.map(arrow => {
        if (arrow.to === flipNodeId) {
          const newConnection = 1 - arrow.connection // binary only for now
          fromNode = state.nodes.find(node => node.id === arrow.from)
          return newArrow(fromNode, flipNode, newConnection)
        } else {
          return arrow
        }
      })
      break

    default:
      const changedNode = state.nodes.find(node => node.id === action.nodeId) || {}

      arrows = state.arrows.map(arrow => {
        if (arrow.from === action.nodeId) {
          return Object.assign({}, arrow, { x1: changedNode.x, y1: changedNode.y + (changedNode.height || 0) })
        } else if (arrow.to === action.nodeId) {
          const connectionPoint = connectionPoints(changedNode.operator)[arrow.connection]
          return Object.assign({}, arrow, { x2: changedNode.x + connectionPoint.x, y2: changedNode.y + connectionPoint.y })
        } else {
          return arrow
        }
      })
      break
  }

  return arrows
}

