import React from 'react'
import { connect } from 'react-redux'
import './FileBrowser.css'

let FileBrowser = ({ state, dispatch }) => {
  const handleCloseClick = (event) => {
    dispatch({ type: 'DESELECT_ALL' })
  }

  const handleFileClick = (fileId, event) => {
    dispatch({ type: 'OPEN_CHART', fileId })
    dispatch({ type: 'DESELECT_ALL' })
  }

  const allFiles = Object.keys(localStorage).filter(key => key.length === 36).map(key => JSON.parse(localStorage.getItem(key))).sort((a,b) => a.updatedAt > b.updatedAt)

  return (
    <div className="shroud">
      <div className="FileBrowser" role="dialog">
        <h1>Open Chart</h1>
        <button className="closeButton" onClick={handleCloseClick} aria-label="Close">Close</button>
        <ul>
          {allFiles.map(file => {
            const current = file.id === state.id
            const dateStr = new Date(file.updatedAt).toLocaleString()
            return <li key={file.id}>
              <button className="fileButton" onClick={handleFileClick.bind(this, file.id)}>
                {dateStr} - { file.name } { current ? '(Currently open)' : '' }
              </button>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}

FileBrowser = connect(state => ({state}))(FileBrowser);

export default FileBrowser
