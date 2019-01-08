import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  fetchIssue,
  issueSelector,
  loadingSelector,
  loadedSelector,
  userSelector,
} from '../../ducks/single-issue'
import history from '../../history'
import Loader from '../loader/'
import styles from './styles/single-issue.module.css'

class SingleIssue extends Component {
  constructor(props) {
    super(props)
    props.fetchIssue(props.url)
  }
  render() {
    if (this.props.loading) {
      return <Loader />
    }
    const { avatar_url, html_url, login } = this.props.user
    const { title, body } = this.props.issue
    return (
      <div className={styles['single-issue']}>
        <ul>
          <li>
            <img src={avatar_url} alt={login} />
          </li>
          <li>
            <h2>
              <a href={html_url}>{login}</a>
            </h2>
          </li>
        </ul>
        <div className={styles['title']}>
          <h1>{title}</h1>
        </div>
        <div className={styles['issue-body']}>
          <p>{body}</p>
        </div>
        <button onClick={history.goBack}>Back</button>
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
