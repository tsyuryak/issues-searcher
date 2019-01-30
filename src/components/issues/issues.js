import React, { Component } from 'react'
import { connect } from 'react-redux'
import loadableVisibility from 'react-loadable-visibility/loadable-components'
import PropTypes from 'prop-types'
import uniqid from 'uniqid'
import {
  fetchIssues,
  goToIssuePage,
  issuesSelector,
  lastPageSelector,
  issuesBaseURLSelector,
  pageSelector,
  itemsQuantitySelector,
  loadingSelector,
} from '../../ducks/issues'
import styles from './styles/issues.module.css'

const IssuesList = loadableVisibility(() => import('./issues-list/issues-list'))
const Paginator = loadableVisibility(() => import('./paginator/paginator'))
const Loader = loadableVisibility(() => import('../loader'))

class Issues extends Component {
  constructor(props) {
    super(props)
    props.fetchIssues(props.params)
  }

  showIssues = () => {
    const { issues, loading } = this.props
    return !loading ? (
      <IssuesList issues={issues} goToIssue={this.props.goToIssuePage} />
    ) : (
      <Loader />
    )
  }

  render() {
    const { lastPage, baseUrl, currentPage, perPage } = this.props
    const initParams = {
      baseUrl,
      maxLimit: lastPage,
      quantity: 5,
      activePage: +currentPage,
      perPage,
    }
    return (
      <div className={styles['container']}>
        {this.showIssues()}
        <div className={styles['paginator']}>
          <Paginator key={uniqid()} params={initParams} />
        </div>
      </div>
    )
  }
}

Issues.propTypes = {
  issues: PropTypes.array.isRequired,
  lastPage: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  perPage: PropTypes.number.isRequired,
  fetchIssues: PropTypes.func.isRequired,
  goToIssuePage: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    issues: issuesSelector(state),
    lastPage: lastPageSelector(state),
    baseUrl: issuesBaseURLSelector(state),
    currentPage: pageSelector(state),
    perPage: itemsQuantitySelector(state),
    loading: loadingSelector(state),
  }),
  { fetchIssues, goToIssuePage }
)(Issues)
