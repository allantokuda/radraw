/*
 * action types
 */

export const RENAME_NODE = 'RENAME_NODE'

/*
 * action creators
 */

export function renameNode(nodeId, name) {
  return { type: RENAME_NODE, nodeId, name }
}
