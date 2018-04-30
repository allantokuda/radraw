import * as actions from '../actions'

const initialState = { editor: { action: 'select' } }

export default (state = initialState, action) => {
  const editor = state.editor

  switch (action.type) {
    case actions.SELECT_RELATION:
      return Object.assign({}, editor, { selectedRelation: action.nodeId })
  }
  return editor
}
