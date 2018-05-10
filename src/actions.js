/*
 * action types
 */

export const MOVE_NODE = 'MOVE_NODE'
export const RENAME_RELATION = 'RENAME_RELATION'
export const RESIZE_NODE = 'RESIZE_NODE'
export const UPDATE_OPERATOR_PARAM = 'UPDATE_OPERATOR_PARAM'
export const SELECT_RELATION = 'SELECT_RELATION'
export const DESELECT_ALL = 'DESELECT_ALL'

/*
 * action creators
 */

export function moveNode(nodeId, dx, dy) {
  return { type: MOVE_NODE, nodeId, dx, dy }
}

export function renameRelation(nodeId, name) {
  return { type: RENAME_RELATION, nodeId, name }
}

export function resizeNode(nodeId, nodeHeight, operatorWidth, operatorHeight) {
  return { type: RESIZE_NODE, nodeId, nodeHeight, operatorWidth, operatorHeight }
}

export function updateOperatorParam(nodeId, paramName, value) {
  return { type: UPDATE_OPERATOR_PARAM, nodeId, paramName, value }
}

export function selectRelation(nodeId) {
  return { type: SELECT_RELATION, nodeId }
}

export function deselectAll() {
  return { type: SELECT_RELATION }
}
