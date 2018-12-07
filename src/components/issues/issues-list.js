import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchIssues,
  loadingSelector,
  issuesSelector,
} from '../../ducks/issues'
import IssuesListItem from './issues-list-item'
import { redirectToIssue } from '../../ducks/single-issue'
import styles from './styles/issues-list.module.css'
import Loader from '../common/loader'

class Issues extends Component {
  constructor(props) {
    super(props)
    const { owner, repo, fetchIssues, perPage, page } = props
    fetchIssues(owner, repo, perPage, page)
  }
  render() {
    const { loading, issues } = this.props
    if (loading || false) {
      console.log('object')
      return <Loader />
    }

    return (
      <>
        <table>
          <thead className={styles['table-header']}>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Opening date/time</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(i => (
              <tr
                className={styles['content']}
                key={i.id}
                onClick={() => this.props.redirectToIssue(i.url)}
              >
                <IssuesListItem
                  number={i.number}
                  title={i.title}
                  dateTime={i.created_at}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    issues: issuesSelector(state),
  }),
  { fetchIssues, redirectToIssue }
)(Issues)