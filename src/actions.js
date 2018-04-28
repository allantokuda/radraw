/*
 * action types
 */

export const MOVE_NODE = 'MOVE_NODE'
export const RENAME_NODE = 'RENAME_NODE'
export const RESIZE_NODE = 'RESIZE_NODE'
export const UPDATE_OPERATOR_PARAM = 'UPDATE_OPERATOR_PARAM'

/*
 * action creators
 */

export function moveNode(nodeId, dx, dy) {
  return { type: MOVE_NODE, nodeId, dx, dy }
}

export function renameNode(nodeId, name) {
  return { type: RENAME_NODE, nodeId, name }
}

export function resizeNode(nodeId, nodeHeight, operatorWidth, operatorHeight) {
  return { type: RESIZE_NODE, nodeId, nodeHeight, operatorWidth, operatorHeight }
}

export function updateOperatorParam(nodeId, paramName, value) {
  return { type: UPDATE_OPERATOR_PARAM, nodeId, paramName, value }
}
