import { connectionPoints } from '../operatorShape'

export default (state, action) => {
  if (state.arrows === undefined) {
    return []
  }

  let arrows

  function newArrow(fromNode, toNode, connection) {
    return {
      from: fromNode.id,
      to: toNode.id,
      connection: connection,
      x1: fromNode.x,
      y1: fromNode.y + fromNode.height,
      x2: toNode.x,
      y2: toNode.y
    }
  }

  switch(action.type) {
    case 'ADD_OPERATOR':
      const fromNodes = state.editor.selectedRelationNodeIds.map(
        nodeId => state.nodes.find(node => node.id === nodeId)
      ).sort((n1, n2) => n1.x > n2.x)

      const toNode = state.nodes.slice(-1)[0] // assume newly created node is last item in the array

      arrows = state.arrows.concat(
        fromNodes.map((fromNode, i) => newArrow(fromNode, toNode, i))
      )
      break

    case 'DELETE_SELECTED':
      let existingNodeIds = state.nodes.map(node => node.id)
      arrows = state.arrows.filter(arrow =>
        existingNodeIds.indexOf(arrow.to) !== -1 &&
        existingNodeIds.indexOf(arrow.from) !== -1
      )
      break

    default:
      let implicitNodeId = (action.type === 'FLIP_OPERATOR' && state.editor.selectedRelationNodeIds[0])
      let actionNodeId = (action.nodeId || implicitNodeId)
      const changedNode = state.nodes.find(node => node.id === actionNodeId) || {}

      arrows = state.arrows.map(arrow => {
        if (arrow.from === actionNodeId) {
          return Object.assign({}, arrow, { x1: changedNode.x, y1: changedNode.y + (changedNode.height || 0) })
        } else if (arrow.to === actionNodeId) {
          let points = connectionPoints(changedNode.operator)
          let connectionPoint = points[arrow.connection]
          return Object.assign({}, arrow, { x2: changedNode.x + connectionPoint.x, y2: changedNode.y + connectionPoint.y })
        } else {
          return arrow
        }
      })
      break
  }
  

  return arrows
}

