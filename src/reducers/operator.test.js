import reducer from './operator'

describe('operator reducer', () => {
  it('accepts updated params', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'HalfHouseLeft', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'test new params' }
      )
    ).toEqual(
      { type: 'Match Join', shape: 'HalfHouseLeft', params: 'test new params', style: {} }
    )
  })

  it('changes to Half House Symmetric for Aid(EM), Bid(EM)', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'HalfHouseLeft', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid(E): C_id, Bid(E): C_id' }
      )
    ).toEqual(
      { type: 'Match Join', shape: 'HalfHouseLeftSymmetric', params: 'Aid(E): C_id, Bid(E): C_id', style: {} }
    )
  })

  it('changes to Full House (but remembering a hidden right/left orientation) when Aid(SOD), Bid(SOD)', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'HalfHouseLeft', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid(S): C_id, Bid(D): C_id' }
      )
    ).toEqual(
      { type: 'Match Join', shape: 'FullHouseLeft', params: 'Aid(S): C_id, Bid(D): C_id', style: {} }
    )
  })

  it('changes back to Half House, with the same orientation it had previously, for Bid(EM)', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'FullHouseRight', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid(S): C_id, Bid(E): C_id' }
      )
    ).toEqual(
      { type: 'Match Join', shape: 'HalfHouseRight', params: 'Aid(S): C_id, Bid(E): C_id', style: {} }
    )
  })

  it('sets the Non-Symmetric-Either dashed style for Aid(E), Bid(M) or vice-versa', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'FullHouseRight', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid(M): C_id, S_code, Bid(E): C_id, S_code' }
      )
    ).toEqual(
      { type: 'Match Join', shape: 'HalfHouseRight', params: 'Aid(M): C_id, S_code, Bid(E): C_id, S_code', style: { strokeDasharray: '5 5' } }
    )
  })

  it('renames to Bad Match Join when using Aid(EM), Bid(SOD)', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'FullHouseRight', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid (M): C_id, Bid( O): C_id' }
      )
    ).toEqual(
      { type: 'Bad Match Join', shape: 'HalfHouseRight', params: 'Aid (M): C_id, Bid( O): C_id', style: { fill: '#fee', stroke: 'red' } }
    )
  })

  it('renames to Bad Match Join when any letters other than DEMOS used', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'HalfHouseRight', params: 'test params' },
        { type: 'UPDATE_OPERATOR_PARAMS', nodeId: 1, value: 'Aid (N): C_id, Bid(E): C_id' }
      )
    ).toEqual(
      { type: 'Bad Match Join', shape: 'HalfHouseRight', params: 'Aid (N): C_id, Bid(E): C_id', style: { fill: '#fee', stroke: 'red' } }
    )
  })


  it('allows operator type edit', () => {
    expect(
      reducer(
        { type: 'Match Join', shape: 'HalfHouseRight', params: 'test params' },
        { type: 'UPDATE_OPERATOR_TYPE', nodeId: 1, value: 'March Join' }
      )
    ).toEqual(
      { type: 'March Join', shape: 'HalfHouseRight', params: 'test params' }
    )

  })
})
