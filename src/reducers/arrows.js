import { connectionPoints } from '../operatorShape'

export default (state, action) => {
  if (state.arrows === undefined) {
    return []
  }

	let arrows

	switch(action.type) {
		case 'ADD_OPERATOR':
			// TODO: handle binary operators
			let fromNode = state.nodes.find(node => node.id === state.editor.selectedRelationNodeIds[0])
			let toNode = state.nodes.slice(-1)[0] // assume newly created node is last item in the array
			arrows = state.arrows.concat({
				from: fromNode.id,
				to: toNode.id,
				connection: 0,
				x1: fromNode.x,
				y1: fromNode.y + fromNode.height,
				x2: toNode.x,
				y2: toNode.y
			})
			break

		default:
			const changedNode = state.nodes.find(node => node.id === action.nodeId) || {}

			arrows = state.arrows.map(arrow => {
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
			break

	}

  

  return arrows
}

