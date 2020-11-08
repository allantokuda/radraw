export default (state) => {
  // Released Nov 7 with no [columns, pkey] properties on relations. Will be needed in the future.
  state.relations.forEach(relation => {
    if (relation.columns === undefined) { relation.columns = [] }
    if (relation.pkey === undefined) { relation.pkey = [] }
  })
  return state
}
