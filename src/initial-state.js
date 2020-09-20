// temporary
export default {
  editor: {
    action: 'select',
    selectedRelationNodeIds: []
  },
  nodes: [
    {
      id: 1,
      x: 100,
      y: 100,
      height: 111,
      operator: {},
      resultRelationId: 6,
    },
    {
      id: 3,
      x: 300,
      y: 100,
      height: 111,
      operator: {},
      resultRelationId: 7,
    },
    {
      id: 2,
      x: 200,
      y: 250,
      height: 212,
      operator: {
        type: 'Match Join',
        shape: 'HalfHouseLeft',
        params: {
          Aid: 'XYZ_Skill_code',
          Bid: 'Skill_code',
          Carry: 'ABC'
        }
      },
      resultRelationId: 5,
    },
    {
      id: 4,
      x: 450,
      y: 550,
      height: 212,
      operator: {
        type: 'Times',
        shape: 'FullHouse',
        params: {
        }
      },
      resultRelationId: 9,
    },
    {
      id: 5,
      x: 450,
      y: 750,
      height: 212,
      operator: {
        type: 'Project',
        shape: 'Pill',
        params: {
        }
      },
      resultRelationId: 10,
    }
  ],
  arrows: [
    { from: 1, to: 2, connection: 0, x1: 100, y1: 211, x2: 200, y2: 230 },
    { from: 3, to: 2, connection: 1, x1: 300, y1: 211, x2: 200, y2: 230 },
    { from: 2, to: 4, connection: 0, x1: 300, y1: 211, x2: 200, y2: 230 },
    { from: 3, to: 4, connection: 1, x1: 300, y1: 211, x2: 200, y2: 230 },
    { from: 4, to: 5, connection: 0, x1: 300, y1: 211, x2: 200, y2: 230 },
  ],
  relations: [
    {
      id: 6,
      name: 'Achievement'
    },
    {
      id: 7,
      name: 'Skill'
    },
    {
      id: 5,
      name: 'Achievement with Skill data'
    },
    {
      id: 9,
      name: 'Something'
    },
    {
      id: 10,
      name: 'Another Thing'
    }
  ]
}

