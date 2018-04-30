import nodes from './nodes'
import arrows from './arrows'
import editor from './editor'

// temporary
import initialState from '../initial-state'

export default function reducer(state = initialState, action) {
  //console.log(state, action)
  return {
    nodes: nodes(state.nodes, action),
    arrows: arrows(state, action),
    editor: editor(state, action)
  }
}
