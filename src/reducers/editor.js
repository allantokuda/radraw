const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  let changes = {}
  let baselineEditor = state.editor
  let connectTo, noSelectAfterDrag, restOfEditorState

  switch(action.type) {
    case 'BROWSE':
      changes = { action: 'open' }
      break

    case 'PAN':
      if (action.x === undefined) break
      changes = { panX: action.x, panY: action.y }
      break

    case 'ZOOM':
      changes = { scale: action.scale }
      break

    case 'NEW_RELATION_MODE':
      changes = { action: 'new_relation' }
      break

    case 'DELETION_MODE':
      changes = { action: 'delete_node' }
      break

    case 'CREATE_RELATION':
      changes = { action: 'select' }
      break

    case 'SELECT':
      // use destructuring to remove 'noSelectAfterDrag' key immutably from the baseline state
      ({ noSelectAfterDrag, ...restOfEditorState } = state.editor)
      baselineEditor = restOfEditorState
      if (noSelectAfterDrag) break

      switch (state.editor.action) {
        case 'connect_from':
          changes = { action: 'select' }
          break

        default:
          changes = {}
      }

      break

    case 'TOGGLE_SELECT':
      // use destructuring to remove 'noSelectAfterDrag' key immutably from the baseline state
      ({ noSelectAfterDrag, ...restOfEditorState } = state.editor)
      baselineEditor = restOfEditorState
      if (noSelectAfterDrag) break

      changes = {}

      break

    case 'MOVE_NODE':
      changes = { noSelectAfterDrag: true }
      break

    case 'INIT_CONNECT':
      changes = { action: 'connect', connectTo: { connection: action.connection, nodeId: action.nodeId } }
      break

    case 'FINISH_CONNECT':
      ({ connectTo, ...restOfEditorState } = state.editor)
      baselineEditor = restOfEditorState
      if (connectTo) // no-op, silence the linter
      changes = { action: 'select' }
      break

    case 'DESELECT_ALL':
    case 'DELETE_SELECTED':
      changes = { action: 'select' }
      break

    default:
  }

  return Object.assign({}, baselineEditor, changes)
}
