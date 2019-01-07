import React, { Component } from 'react'
import { connect } from 'react-redux'
import { lastPageSelector, redirectToIssues } from '../../ducks/issues'
import {
  createViews,
  viewsSelector,
  currentViewNumberSelector,
  currentViewSelector,
} from '../../ducks/paginator'
import { NavLink } from 'react-router-dom'
import { generateId } from '../../helpers'
import styles from './styles/issues-paginator.module.css'

class IssuesPaginator extends Component {
  static defaultProps = {
    currentView: [],
    lastPage: 0,
    limitItems: 8,
  }

  componentDidUpdate() {
    const { lastPage, createViews, limitItems } = this.props
    createViews(limitItems, lastPage)
  }

  changePage = (direction, max) => {
    const { owner, repo, perPage, currentPage, redirectToIssues } = this.props

    const isNextPageNotExists =
      direction(+currentPage) < 1 || direction(+currentPage) > max
    if (isNextPageNotExists) return
    const nextPage = direction(+currentPage)
    redirectToIssues(owner, repo, perPage, nextPage)
  }

  showNext = () => {
    if (false) {
      return null
    }
    return (
      <li>
        <div
          className={styles['pbutton']}
          onClick={() => this.changePage(x => x + 1, this.props.lastPage)}
        >
          <span className={styles['next-icon']}>Next</span>
        </div>
      </li>
    )
  }

  showPrev = () => {
    if (false) {
      return null
    }
    return (
      <li>
        <div
          className={styles['pbutton']}
          onClick={() => this.changePage(x => x - 1, this.props.lastPage)}
        >
          <span className={styles['prev-icon']}>Prev</span>
        </div>
      </li>
    )
  }

  render() {
    const { lastPage, owner, repo, perPage, currentView } = this.props

    if (!lastPage) {
      return <div className={styles['container']}>Loading...</div>
    }

    const url = `issues/${owner}/${repo}/${perPage}`

    return (
      <div className={styles['container']}>
        <ul className={styles['page-list']}>
          {this.showPrev()}
          {currentView.map(i => (
            <li key={generateId()}>
              <NavLink activeClassName={styles['active']} to={`/${url}/${i}`}>
                {i}
              </NavLink>
            </li>
          ))}
          {this.showNext()}
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    lastPage: lastPageSelector(state),
    views: viewsSelector(state),
    viewNumberSelector: currentViewNumberSelector(state),
    currentView: currentViewSelector(state),
  }),
  { createViews, redirectToIssues }
)(IssuesPaginator)
