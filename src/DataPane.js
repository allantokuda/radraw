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
		let selectedRelations
		if (selectedRelationIds.length) {
			selectedRelations = state.relations.filter((relation) => selectedRelationIds.indexOf(relation.id) !== -1)
		} else {
			selectedRelations = state.relations
		}

    const handleChanges = (relation, changes) => {
      dispatch({ type: 'EDIT_DATA', relationId: relation.id, changes })
    }

    const handleSelect = (relation, cellSelection) => {
      dispatch({ type: 'SELECT_CELLS', relationId: relation.id, cellSelection })
    }

    const handleRawPaste = (relation, str) => {
      let pasteWidth = 0
      let pasteHeight = 0
      const result = str.split(/\r\n|\n|\r/).map(row => {
        const splitRow = row.split('\t');
        pasteWidth = Math.max(pasteWidth, splitRow.length)
        pasteHeight++
        return splitRow
      });
      dispatch({ type: 'PASTE_EXPAND', relationId: relation.id, cellSelection: relation.cellSelection, pasteWidth, pasteHeight })
      return result
    }

    return (
      <div className="DataPane">
        { selectedRelations.map(relation => {
          return <div key={relation.id}>
            <h2>{ relation.name || 'Untitled Relation' }</h2>
            <ReactDataSheet
              data={relation.data || [[{ value: '' }]]}
              parsePaste={handleRawPaste.bind(this, relation)}
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
              onSelect={handleSelect.bind(this, relation)}
            />
          </div>
        })}
      </div>
    )
  }
}

DataPane = connect(state => ({state}))(DataPane);

export default DataPane
