// temporary
export default {
  nodes: [
    {
      id: 1,
      x: 100,
      y: 100,
      height: 111,
      operator: {},
      resultRelationId: 6,
      relation: {
        name: 'Achievement'
      }
    },
    {
      id: 3,
      x: 300,
      y: 100,
      height: 111,
      operator: {},
      resultRelationId: 7,
      relation: {
        name: 'Skill'
      }
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
      relation: {
        name: 'Achievement with Skill data'
      }
    }
  ],
  arrows: [
    { from: 1, to: 2, connection: 0, x1: 100, y1: 211, x2: 200, y2: 230 },
    { from: 3, to: 2, connection: 1, x1: 300, y1: 211, x2: 200, y2: 230 },
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
    }
  ]
}

