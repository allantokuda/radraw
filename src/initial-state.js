// temporary
export default {
  editor: {
    action: 'select',
    selection: [],
    panX: 1, // would use 0 for initial state but react-pinch-pan-zoom behavior depends on this value being truthy :(
    panY: 1,
    scale: 1
  },
  nodes: [
    {
      id: 1,
      x: 100,
      y: 100,
      height: 74,
      operator: {},
      resultRelationId: 1,
    },
    {
      id: 2,
      x: 250,
      y: 100,
      height: 74,
      operator: {},
      resultRelationId: 2,
    },
    {
      id: 3,
      x: 400,
      y: 100,
      height: 74,
      operator: {},
      resultRelationId: 3,
    },
    {
      id: 4,
      x: 550,
      y: 100,
      height: 74,
      operator: {},
      resultRelationId: 4,
    },
  ],
  arrows: [
  ],
  relations: [
    {
      id: 1,
      name: 'Creature'
    },
    {
      id: 2,
      name: 'Skill'
    },
    {
      id: 3,
      name: 'Achievement'
    },
    {
      id: 4,
      name: 'Aspiration'
    },
  ]
}

