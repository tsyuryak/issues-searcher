import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchIssues,
  loadingSelector,
  issuesSelector,
  lastPageSelector,
  currentBasuUrlSelector,
  goToPage,
} from '../../ducks/issues'
import IssuesListItem from './issues-list-item'
import { redirectToIssue } from '../../ducks/single-issue'
import styles from './styles/issues-list.module.css'
import Loader from '../loader'
import Paginator from '../paginator/paginator'

//Tmp
import { params1 } from '../paginator/paginator.stories'

class Issues extends Component {
  constructor(props) {
    super(props)
    const { owner, repo, fetchIssues, perPage, page } = props
    fetchIssues(owner, repo, perPage, page)
  }
  render() {
    const { loading, issues } = this.props

    if (loading || false) {
      return <Loader />
    }

    return (
      <div className={styles['container']}>
        <ul className={styles['list']}>
          {issues.map(i => (
            <li
              className={styles['list-item']}
              key={i.id}
              onClick={() => this.props.redirectToIssue(i.url)}
            >
              <IssuesListItem
                number={i.number}
                title={i.title}
                dateTime={i.created_at}
              />
            </li>
          ))}
        </ul>
        <Paginator
          params={{
            ...params1,
            baseUrl: this.props.baseUrl,
            quantity: 6,
            activePage: +this.props.page,
            maxLimit: this.props.lastPage,
          }}
          onGoToPage={url => this.props.goToPage(url)}
        />
      </div>
    )
  }
}

/* 

Paginator.propTypes = {
  params: PropTypes.shape({
    baseUrl: PropTypes.string.isRequired,
    activePage: PropTypes.number.isRequired,
    maxLimit: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    nextLinkText: PropTypes.string.isRequired,
    prevLinkText: PropTypes.string.isRequired,
    firstLinkText: PropTypes.string.isRequired,
    lastLinkText: PropTypes.string.isRequired,
  }),
  onGoToPage: PropTypes.func.isRequired,
}

*/

export default connect(
  state => ({
    loading: loadingSelector(state),
    issues: issuesSelector(state),
    lastPage: lastPageSelector(state),
    baseUrl: currentBasuUrlSelector(state),
  }),
  { fetchIssues, redirectToIssue, goToPage }
)(Issues)
