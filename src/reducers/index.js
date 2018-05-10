import nodes from './nodes'
import arrows from './arrows'
import editor from './editor'
import relations from './relations'

// temporary
import initialState from '../initial-state'

export default function reducer(state = initialState, action) {
  //console.log(state, action)
  return {
    nodes: nodes(state.nodes, action),
    arrows: arrows(state, action),
    relations: relations(state, action),
    editor: editor(state, action)
  }
}
