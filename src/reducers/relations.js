import * as actions from '../actions'

export default (state, action) => {
  return state.relations.map(relation => {
    if (relation.id === action.relationId) {
      switch (action.type) {
        case actions.RENAME_RELATION:
          return Object.assign({}, relation, { name: action.name })

        default:
          return relation
      }
    }
    return relation
  })
}
