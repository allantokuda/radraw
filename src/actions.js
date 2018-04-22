/*
 * action types
 */

export const RENAME_NODE = 'RENAME_NODE'
export const UPDATE_OPERATOR_PARAM = 'UPDATE_OPERATOR_PARAM'

/*
 * action creators
 */

export function renameNode(nodeId, name) {
  return { type: RENAME_NODE, nodeId, name }
}

export function updateOperatorParam(nodeId, paramName, value) {
  return { type: UPDATE_OPERATOR_PARAM, nodeId, paramName, value }
}
