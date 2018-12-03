import React from 'react'
import { connect } from 'react-redux'
import { paginatorSelector, redirectToIssues } from '../../ducks/issues'
import { loadedSelector as issuesLoaded } from '../../ducks/issues'
import { NavLink } from 'react-router-dom'
import { generateId } from '../../helpers'
import styles from './styles/issues-paginator.module.css'

function IssuesPaginator({
  redirectToIssues,
  paginator,
  owner,
  repo,
  issuesLoaded,
}) {
  const { maxPage, url, perPage } = paginator

  const changeItemsNum = e => {
    const pageNum = +e.target.value
    const startPage = 1
    redirectToIssues(owner, repo, pageNum, startPage)
  }

  if (!issuesLoaded) {
    return null
  }

  return (
    <div className={styles['paginator-container']}>
      <select onChange={e => changeItemsNum(e)} value={+perPage}>
        {[10, 30, 50, 70, 100].map(item => (
          <option key={generateId()} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className={styles['pagination']}>
        <ul>
          {[...Array(maxPage).keys()].map(i => (
            <li key={generateId()}>
              <NavLink
                activeClassName={styles['active']}
                to={`${url}/${perPage}/${i + 1}`}
              >
                {i + 1}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default connect(
  state => ({
    paginator: paginatorSelector(state),
    issuesLoaded: issuesLoaded(state),
  }),
  { redirectToIssues }
)(IssuesPaginator)
