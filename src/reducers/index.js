import nodes from './nodes'
import arrows from './arrows'
import editor from './editor'
import relations from './relations'

// temporary
import initialState from '../initial-state'

export function maxPlusOne(objects) {
  if (objects.length === 0) {
    return 1
  } else {
    return Math.max(...objects.map((obj) => obj.id)) + 1
  }
}

export default function reducer(state = initialState, action) {
  //console.log(state, action)
  const newNodes = nodes(state, action)
  const stateWithNewNodes = Object.assign({}, state, { nodes: newNodes })
  return {
    nodes: newNodes,
    arrows: arrows(stateWithNewNodes, action),
    relations: relations(state, action),
    editor: editor(state, action)
  }
}
