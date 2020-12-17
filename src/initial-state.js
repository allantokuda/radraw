import uuid from './reducers/uuid'
//import stringSheet from './reducers/stringSheet'

// temporary
export default {
  id: uuid(),
  name: 'Untitled',
  editor: {
    action: 'select',
    panX: 1, // would use 0 for initial state but react-pinch-pan-zoom behavior depends on this value being truthy :(
    panY: 1,
    scale: 1
  },
  nodes: [
  ],
  arrows: [
  ],
  relations: [
  ]
}

