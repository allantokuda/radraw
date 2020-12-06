import datasheet from './datasheet'
import { maxPlusOne } from './index'

export default (state, action = {}) => {
  let relations = state.relations.map(relation => {
    if (relation.id === action.relationId) {
      switch (action.type) {
        case 'RENAME_RELATION':
          return Object.assign({}, relation, { name: action.name })

        case 'SELECT_CELLS':
          return Object.assign({}, relation, { cellSelection: action.cellSelection })

        case 'EDIT_DATA':
        case 'PASTE_EXPAND':
        case 'COLUMN_INSERT_RIGHT':
        case 'COLUMN_INSERT_LEFT':
        case 'COLUMN_DELETE':
          return Object.assign({}, relation, { data: datasheet(relation.data, action) })

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
