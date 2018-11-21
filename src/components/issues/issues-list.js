import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchIssues,
  loadingSelector,
  issuesSelector,
} from '../../ducks/issues'
import IssuesListItem from './issues-list-item'

class Issues extends Component {
  constructor(props) {
    super(props)
    const { owner, repo, fetchIssues } = props
    fetchIssues(owner, repo)
  }
  render() {
    const { loading, issues } = this.props
    if (loading) {
      return <div>LOADING...</div>
    }

    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Opening date/time</th>
          </tr>
        </thead>
        <tbody>
          {issues.map(i => (
            <tr key={i.id} onClick={() => console.log('to detais', i.url)}>
              <IssuesListItem
                number={i.number}
                title={i.title}
                dateTime={i.created_at}
              />
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    issues: issuesSelector(state),
  }),
  { fetchIssues }
)(Issues)
