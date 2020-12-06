import reducer from './relations'
import * as actions from '../actions'

describe('relations reducer', () => {
  it('should allow a relation to be renamed', () => {
    expect(
      reducer({
        relations: [
          { id: 1, name: 'Creature' },
          { id: 2, name: 'Achievement' },
          { id: 3, name: 'Skill' },
        ]},
        {
          type: actions.RENAME_RELATION,
          relationId: 2,
          name: 'Knowledge of Skill by Creature',
        }
      )
    ).toEqual([
      { id: 1, name: 'Creature' },
      { id: 2, name: 'Knowledge of Skill by Creature' },
      { id: 3, name: 'Skill' },
    ])
  })

  it('should create a new unnamed relation with a unique ID', () => {
    expect(reducer(
      {
        relations: [
          { id: 1, name: 'Creature' },
          { id: 3, name: 'Achievement' },
          { id: 5, name: 'Skill' },
        ]
      },
      { type: 'CREATE_RELATION', x: 100, y: 100 }
    )).toEqual([
      { id: 1, name: 'Creature' },
      { id: 3, name: 'Achievement' },
      { id: 5, name: 'Skill' },
      { id: 6, name: '' },
    ])
  })

  it('marks cell selection', () => {
    let cellSelection = { start: { i: 3, j: 4 }, end: { i: 5, j: 6 } }
    expect(reducer(
      {
        relations: [{ id: 1, name: 'Creature' }]
      },
      { type: 'SELECT_CELLS', relationId: 1, cellSelection }
    )).toEqual([
      { id: 1, name: 'Creature', cellSelection },
    ])
  })

  it('delegates to datasheet reducer', () => {
    expect(reducer(
      {
        relations: [
          { id: 1, name: 'Creature', data: [[1,2]] },
        ]
      },
      { type: 'COLUMN_INSERT_RIGHT', relationId: 1, columnId: 1 }
    )).toEqual([
      { id: 1, name: 'Creature', data: [[1,2,{ value: '' }]] },
    ])
  })
})
