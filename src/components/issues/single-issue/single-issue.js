import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadableVisibility from 'react-loadable-visibility/react-loadable'

import {
  fetchIssue,
  issueSelector,
  loadingSelector,
  userSelector,
} from '../../../ducks/single-issue'
import history from '../../../history'
import Loader from '../../loader'

const IssueView = LoadableVisibility({
  loader: () => import('./issue-view'),
  loading: Loader,
  delay: 200,
})

class SingleIssue extends Component {
  constructor(props) {
    super(props)
    props.fetchIssue(props.url)
  }
  render() {
    const { avatar_url, html_url, login } = this.props.user
    const { title, body } = this.props.issue
    return (
      <IssueView
        avatar_url={avatar_url}
        html_url={html_url}
        title={title}
        body={body}
        login={login}
        goBack={history.goBack}
      />
    )
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    issue: issueSelector(state),
    user: userSelector(state),
  }),
  { fetchIssue }
)(SingleIssue)
