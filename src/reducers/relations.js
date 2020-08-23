import { maxPlusOne } from './index'

export default (state, action = {}) => {
  let relations = state.relations.map(relation => {
    if (relation.id === action.relationId) {
      switch (action.type) {
        case 'RENAME_RELATION':
          return Object.assign({}, relation, { name: action.name })

        default:
          return relation
      }
    }
    return relation
  })

  if (action.type === 'CREATE_RELATION') {
    relations = relations.concat({ id: maxPlusOne(state.relations), name: '' })
  }

  return relations;
}
