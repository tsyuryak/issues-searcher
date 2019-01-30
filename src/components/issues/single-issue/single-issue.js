import React, { Component } from 'react'
import { connect } from 'react-redux'
import loadableVisibility from 'react-loadable-visibility/loadable-components'

import {
  fetchIssue,
  issueSelector,
  loadingSelector,
  userSelector,
} from '../../../ducks/single-issue'
import history from '../../../history'

const IssueView = loadableVisibility(() => import('./issue-view'))
const Loader = loadableVisibility(() => import('../../loader'))

class SingleIssue extends Component {
  constructor(props) {
    super(props)
    props.fetchIssue(props.url)
  }
  render() {
    const { avatar_url, html_url, login } = this.props.user
    const { title, body } = this.props.issue
    return this.props.loading ? (
      <Loader />
    ) : (
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
