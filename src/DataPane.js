import React from 'react'
import { connect } from 'react-redux'
import ReactDataSheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css'
import './DataPane.css'
import ColumnMenu from './ColumnMenu'

class DataPane extends React.Component {
  render() {
    let { state, dispatch } = this.props

    let selectedNodes = state.nodes.filter((node) => node.selected)
    let selectedRelationIds = selectedNodes.map((node) => node.resultRelationId)
    let selectedRelations = state.relations.filter((relation) => selectedRelationIds.indexOf(relation.id) !== -1)

    const handleChanges = (relation, changes) => {
      dispatch({ type: 'EDIT_DATA', relationId: relation.id, changes })
    }

    const addRow = (relation) => {
      dispatch({ type: 'ADD_ROW', relationId: relation.id })
    }

    return (
      <div className="DataPane">
        { selectedRelations.map(relation => {
          return <div key={relation.id}>
            <h2>{ relation.name || 'Untitled Relation' }</h2>
            <ReactDataSheet
              data={relation.data || [[{ value: '' }]]}
              sheetRenderer={props => {
                let headings = props.children[0].props.children
                return (
                  <table className={props.className + ' my-awesome-extra-class'}>
                      <thead>
                        <tr>
                          {headings.map(heading => (<th key={heading.key}><ColumnMenu sheet={relation.data} relationId={relation.id} heading={heading}/></th>))}
                        </tr>
                      </thead>
                      <tbody>
                        {props.children}
                      </tbody>
                  </table>
                )
              }}
              valueRenderer={cell => cell.value}
              onCellsChanged={handleChanges.bind(this, relation)}
            />
            <button onClick={addRow.bind(this, relation)}>Add row</button>
          </div>
        })}
      </div>
    )
  }
}

DataPane = connect(state => ({state}))(DataPane);

export default DataPane
