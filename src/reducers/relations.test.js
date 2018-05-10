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
})
