import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchIssues,
  goToIssuePage,
  loadingSelector,
  issuesSelector,
  lastPageSelector,
} from '../../ducks/issues'
import IssuesListItem from './issues-list-item'
import styles from './styles/issues-list.module.css'
import Loader from '../loader'

class Issues extends Component {
  constructor(props) {
    super(props)
    props.fetchIssues(props.params)
  }
  render() {
    const { loading, issues } = this.props

    if (loading) {
      return <Loader />
    }

    return (
      <div className={styles['container']}>
        <ul className={styles['list']}>
          {issues.map(i => (
            <li
              className={styles['list-item']}
              key={i.id}
              onClick={() => this.props.goToIssuePage(i.url)}
            >
              <IssuesListItem
                number={i.number}
                title={i.title}
                dateTime={i.created_at}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Issues.propTypes = {
  fetchIssues: PropTypes.func.isRequired,
  goToIssuePage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  issues: PropTypes.array.isRequired,
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    issues: issuesSelector(state),
    lastPage: lastPageSelector(state),
  }),
  { fetchIssues, goToIssuePage }
)(Issues)
