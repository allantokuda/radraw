import operators from '../operators'

const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  const allowedOperations = operators
  const editor = Object.assign({}, state.editor, { allowedOperations })

  // TODO
  // switch(action.type) {
  //   case operators.PROJECT:
  //     break
  //   default:
  // }

  return editor
}
