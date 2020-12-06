import React from 'react'
import ContentEditable from 'react-contenteditable'
import * as actions from './actions'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'

// Enable mult-touch select: select on touchStart and then
// wait before registering touchEnd as focus event on contenteditable input
// so that first tap (start) selects and second tap (end) focuses the input
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
    event.stopPropagation() // prevent click event from propagating up to the canvas and causing another deselect
    selectRelation(event.shiftKey)
  }

  const handleTouchStart = (event) => {
    selectRelation(event.touches.length > 1)

    // if not selected, let first tap cause only a select and not a focus of the contenteditable.
    // signal to the touchEnd event to prevent generating a click event.
    if (!selected) {
      clearTimeout(memo.timeout)
      memo.wait = true
      memo.timeout = setTimeout((() => memo.wait = false), 100)
    }
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
