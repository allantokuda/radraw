import operators from '../operators'

const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  const allowedOperations = operators
  let changes = {}

  switch(action.type) {
    case 'NEW_RELATION_MODE':
      changes = { action: 'new_relation' }
      break
    case 'CREATE_RELATION':
      changes = { action: 'select' }
      break
    default:
  }

  return Object.assign({}, state.editor, { allowedOperations }, changes)
}
