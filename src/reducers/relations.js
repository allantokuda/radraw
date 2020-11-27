import { maxPlusOne } from './index'

export default (state, action = {}) => {
  let relations = state.relations.map(relation => {
    if (relation.id === action.relationId) {
      switch (action.type) {
        case 'RENAME_RELATION':
          return Object.assign({}, relation, { name: action.name })

        case 'EDIT_DATA':
          const emptyRelation = [[{ value: null }]]
          let newData = (relation.data || emptyRelation).map(row => [...row])
          action.changes.forEach(({ cell, row, col, value }) => {
            newData[row][col] = { ...newData[row][col], value };
          });
          return Object.assign({}, relation, { data: newData })

        default:
          return relation
      }
    }
    return relation
  })

  switch (action.type) {
    case 'CREATE_RELATION':
    case 'ADD_OPERATOR':
      relations = relations.concat({ id: maxPlusOne(state.relations), name: '' })
      break
    default:
  }

  return relations;
}
