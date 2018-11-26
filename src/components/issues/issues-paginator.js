import React from 'react'
import { connect } from 'react-redux'
import {
  fetchIssues,
  paginatorSelector,
  redirectToIssues,
} from '../../ducks/issues'
import { NavLink } from 'react-router-dom'
import { generateId } from '../../helpers'

function IssuesPaginator({ redirectToIssues, paginator, owner, repo }) {
  const { maxPage, url, perPage } = paginator

  const changeItemsNum = e => {
    const pageNum = +e.target.value
    const firstPage = 1
    redirectToIssues(owner, repo, pageNum, firstPage)
  }
  const keyUpHandler = e => {
    if (e.keyCode !== 13) return
    changeItemsNum(e)
  }

  return (
    <div>
      <input onKeyUp={e => keyUpHandler(e)} onBlur={e => changeItemsNum(e)} />
      <ul>
        {[...Array(maxPage).keys()].map(i => (
          <li key={generateId()}>
            <NavLink to={`${url}/${perPage}/${i + 1}`}>{i + 1}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default connect(
  state => ({
    paginator: paginatorSelector(state),
  }),
  { redirectToIssues }
)(IssuesPaginator)
