/*
 * action types
 */

export const MOVE_NODE = 'MOVE_NODE'

/*
 * action creators
 */

export function moveNode(nodeId, dx, dy) {
  return { type: MOVE_NODE, nodeId, dx, dy }
}
