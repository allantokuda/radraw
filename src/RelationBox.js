import React from 'react'
import ContentEditable from 'react-contenteditable'
import * as actions from './actions'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

// Short touch to select, long touch to edit
let memo = { wait: false }

export default ({ node, relation, state, onChange }) => {
  const dispatch = useDispatch()
  const selected = node.selected

  const selectRelation = (toggleMode) => {
    if (state.editor.action === 'connect') {
      dispatch(actions.finishConnect(node.id))
    } else {
      dispatch(actions.select(node.id, toggleMode))
    }
  }

  const handleClick = (event) => {
    event.stopPropagation()
    selectRelation(event.shiftKey)
  }

  const handleTouchStart = (event) => {
    memo.wait = true
    setTimeout((() => memo.wait = false), 100)
    selectRelation(event.touches.length > 1)
  }

  const handleTouchEnd = (event) => {
    if (memo.wait) event.preventDefault()
  }

  const handleEditName = (event) => {
    dispatch(actions.renameRelation(node.resultRelationId, event.target.value))
    setTimeout(onChange)
  }

  return (
    <div className="relation dragHandle centeredOnZeroWidthParent"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ContentEditable className={classNames({ noDrag: selected, relationEdit: true })}
                       html={relation.name}
                       disabled={!selected}
                       onChange={handleEditName}/>
    </div>
  )
}
