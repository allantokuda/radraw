import uuid from './reducers/uuid'
import stringSheet from './reducers/stringSheet'

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
      name: 'Creature',
      columns: ['C_id', 'C_name', 'C_type'],
      pkey: ['C_id'],
      data: stringSheet('C_id,S_code,Score;1,Bannon,Person;2,Myers,Person;3,Neff,Person;4,Neff,Person;5,Mieska,Person;6,Carlis,Person;7,Kermit,Frog;8,Godzilla,Monster')
    },
    {
      id: 2,
      name: 'Skill',
      columns: ['S_code', 'S_description'],
      pkey: ['S_code'],
      data: stringSheet('S_code,S_description;A,Float;E,Swim;Z,Gargle;U,Walk on Water;O,Sink')
    },
    {
      id: 3,
      name: 'Achievement',
      columns: ['C_id', 'S_code', 'Score'],
      pkey: ['C_id', 'S_code'],
      data: stringSheet('C_id,S_code,Score;1,A,1;1,E,3;1,Z,3;2,A,3;3,A,2;3,Z,1;4,A,2;4,E,2;5,Z,3;7,E,1;8,O,1')
    },
    {
      id: 4,
      name: 'Aspiration',
      columns: ['C_id', 'S_code', 'Score'],
      pkey: ['C_id', 'S_code'],
      data: stringSheet('C_id,S_code,Score;1,A,1;1,E,3;1,Z,1;2,A,3;3,A,2;3,Z,2;4,E,2;5,Z,3;6,Z,3;7,E,3;8,O,1')
    },
  ]
}

