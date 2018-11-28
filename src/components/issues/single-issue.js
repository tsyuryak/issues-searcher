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
    return (
      <div>
        <img src={this.props.user.avatar_url} alt={this.props.user.login} />
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
