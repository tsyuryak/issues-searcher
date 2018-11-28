import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchIssue,
  issueSelector,
  loadingSelector,
  loadedSelector,
  userSelector,
} from '../../ducks/single-issue'

class SingleIssue extends Component {
  constructor(props) {
    super(props)
    props.fetchIssue(props.url)
  }
  render() {
    if (this.props.loading) {
      return <h1>Loading...</h1>
    }
    console.log('SI', this.props.issue)
    const { avatar_url, html_url, login } = this.props.user
    const { title, body } = this.props.issue
    return (
      <div>
        <img src={avatar_url} alt={login} />
        <h2>
          <a href={html_url}>{login}</a>
        </h2>
        <div>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    loaded: loadedSelector(state),
    issue: issueSelector(state),
    user: userSelector(state),
  }),
  { fetchIssue }
)(SingleIssue)
