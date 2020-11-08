import nodes from './nodes'
import arrows from './arrows'
import editor from './editor'
import relations from './relations'
import initialState from '../initial-state'
import migrate from './migrate'

export function maxPlusOne(objects) {
  if (objects.length === 0) {
    return 1
  } else {
    return Math.max(...objects.map((obj) => obj.id)) + 1
  }
}

export default function reducer(state = initialState, action) {
  if (action.type === 'NEW_CHART') {
    return initialState
  } else if (action.type == 'OPEN_CHART') {
    return migrate(JSON.parse(localStorage.getItem(action.fileId)))
  }

  //console.log(state, action)
  const newNodes = nodes(state, action)
  const stateWithNewNodes = Object.assign({}, state, { nodes: newNodes })
  return {
    id: state.id,
    name: state.name,
    editor: editor(stateWithNewNodes, action),
    nodes: newNodes,
    arrows: arrows(stateWithNewNodes, action),
    relations: relations(state, action),
  }
}
