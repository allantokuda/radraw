import React from 'react'
import { connect } from 'react-redux'

class DataPane extends React.Component {
  render() {
    let { state } = this.props

    let selectedNodes = state.nodes.filter((node) => node.selected)
    let selectedRelationIds = selectedNodes.map((node) => node.resultRelationId)
    let selectedRelations = state.relations.filter((relation) => selectedRelationIds.indexOf(relation.id) !== -1)

    return (
      <div className="DataPane">
        { selectedRelations.map((relation) => (
          <div key={relation.id}>
            <h2>{ relation.name || 'Untitled Relation' }</h2>
          </div>
        )) }
      </div>
    )
  }
}

DataPane = connect(state => ({state}))(DataPane);

export default DataPane
