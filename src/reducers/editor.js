const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  let changes = {}

  switch(action.type) {
    case 'NEW_RELATION_MODE':
      changes = { action: 'new_relation' }
      break
    case 'CREATE_RELATION':
      changes = { action: 'select' }
      break
    case 'SELECT_RELATION':
      changes = { selectedRelationNodeIds: [action.nodeId] }
      break
    case 'DESELECT_ALL':
      changes = { selectedRelationNodeIds: [] }
      break

    default:
  }

  return Object.assign({}, state.editor, changes)
}
