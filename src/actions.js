/*
 * action types
 */

export const MOVE_NODE = 'MOVE_NODE'
export const RENAME_RELATION = 'RENAME_RELATION'
export const RESIZE_NODE = 'RESIZE_NODE'
export const UPDATE_OPERATOR_PARAMS = 'UPDATE_OPERATOR_PARAMS'
export const SELECT_RELATION = 'SELECT_RELATION'
export const DESELECT_ALL = 'DESELECT_ALL'
export const NEW_RELATION_MODE = 'NEW_RELATION_MODE'
export const CREATE_RELATION = 'CREATE_RELATION'
export const ADD_OPERATOR = 'ADD_OPERATOR'

/*
 * action creators
 */

export function moveNode(nodeId, dx, dy) {
  return { type: MOVE_NODE, nodeId, dx, dy }
}

export function resizeNode(nodeId, nodeHeight, operatorWidth, operatorHeight) {
  return { type: RESIZE_NODE, nodeId, nodeHeight, operatorWidth, operatorHeight }
}

export function updateOperatorParams(nodeId, value) {
  return { type: UPDATE_OPERATOR_PARAMS, nodeId, value }
}

export function selectRelation(nodeId) {
  return { type: SELECT_RELATION, nodeId }
}

export function renameRelation(relationId, name) {
  return { type: RENAME_RELATION, relationId, name }
}

export function deselectAll() {
  return { type: DESELECT_ALL }
}

export function newRelationMode() {
  return { type: NEW_RELATION_MODE }
}

export function createRelation(x, y) {
  return { type: CREATE_RELATION, x, y }
}

export function addOperator(operatorType) {
  return { type: ADD_OPERATOR, operatorType }
}
