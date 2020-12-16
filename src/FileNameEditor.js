import React from 'react'
import { connect } from 'react-redux'
import ContentEditable from 'react-contenteditable'

let FileNameEditor = ({ state, dispatch }) => {
  const handleEdit = (event) => {
    dispatch({ type: 'RENAME_CHART', newName: event.target.value.replace(/<br>$/, '') })
  }

  return (
    <div className="FileNameEditor">
      <ContentEditable html={state.name} tagName="h1" onChange={handleEdit.bind(this)} style={{ fontSize: 24, margin: 16, fontWeight: 400 }} />
    </div>
  )
}

FileNameEditor = connect(state => ({state}))(FileNameEditor);

export default FileNameEditor
