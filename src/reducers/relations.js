export default (state, action) => {
  return state.relations.map(relation => {
    if (relation.id === action.relationId) {
      return Object.assign({}, relation, { name: action.name })
    }
    return relation
  })
}
