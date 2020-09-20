const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  let changes = {}
  let baselineEditor = state.editor

  switch(action.type) {
    case 'NEW_RELATION_MODE':
      changes = { action: 'new_relation' }
      break

    case 'CREATE_RELATION':
      changes = { action: 'select' }
      break

    case 'SELECT_RELATION':
      // use destructuring to remove 'noSelectAfterDrag' key immutably from the baseline state
      let { noSelectAfterDrag, ...restOfEditorState } = state.editor
      baselineEditor = restOfEditorState

      if (noSelectAfterDrag) break

      const ids = state.editor.selectedRelationNodeIds
      const existingIndex = ids.indexOf(action.nodeId)
      if (existingIndex > -1) {
        changes = {
          selectedRelationNodeIds: [
            ...ids.slice(0, existingIndex),
            ...ids.slice(existingIndex + 1)
          ]
        }
      } else {
        changes = { selectedRelationNodeIds: ids.concat(action.nodeId) }
      }

      break

    case 'MOVE_NODE':
      changes = { noSelectAfterDrag: true }
      break

    case 'ADD_OPERATOR':
      changes = { selectedRelationNodeIds: [Math.max(...state.nodes.map(node => node.id))] }
      break

    case 'DESELECT_ALL':
      changes = { selectedRelationNodeIds: [] }
      break

    default:
  }

  return Object.assign({}, baselineEditor, changes)
}
