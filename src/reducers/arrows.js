import { connectionPoints } from '../operatorShape'
import { updateNode } from './nodes'

export default (state, action) => {
  const oldNode = state.nodes.find(node => node.id === action.nodeId) || {}
  const changedNode = updateNode(oldNode, action)

  if (state.arrows === undefined) {
    return []
  }

  let arrows = state.arrows.map(arrow => {
    if (arrow.from === action.nodeId) {
      return Object.assign({}, arrow, { x1: changedNode.x, y1: changedNode.y + (changedNode.height || 0) })
    } else if (arrow.to === action.nodeId) {
      let points = connectionPoints(changedNode.operator)
      let connectionPoint = points[arrow.connection]
      return Object.assign({}, arrow, { x2: changedNode.x + connectionPoint.x, y2: changedNode.y + connectionPoint.y })
    } else {
      return arrow
    }
  })

  

  return arrows
}

