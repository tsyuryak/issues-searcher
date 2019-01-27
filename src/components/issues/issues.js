import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoadableVisibility from 'react-loadable-visibility/react-loadable'
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
  paginatorRequest,
} from '../../ducks/issues'
import styles from './styles/issues.module.css'
import Loader from '../loader'

//TMP
import { params1 } from './paginator/paginator.stories.js'
//import Paginator from './paginator/paginator'

const IssuesList = LoadableVisibility({
  loader: () => import('./issues-list/issues-list'),
  loading: Loader,
})

const Paginator = LoadableVisibility({
  loader: () => import('./paginator/paginator'),
  loading: () => '',
})

class Issues extends Component {
  constructor(props) {
    super(props)
    props.fetchIssues(props.params)
  }

  showIssues = () => {
    const { issues } = this.props
    return <IssuesList issues={issues} goToIssue={this.props.goToIssuePage} />
  }

  render() {
    const {
      baseUrl,
      lastPage,
      currentPage,
      paginatorRequest,
      perPage,
    } = this.props

    return (
      <div className={styles['container']}>
        {this.showIssues()}
        <div className={styles['paginator']}>
          <Paginator
            key={uniqid()}
            params={{
              ...params1,
              baseUrl,
              maxLimit: lastPage,
              quantity: 6,
              activePage: +currentPage,
              perPage,
            }}
            onGoToPage={paginatorRequest}
          />
        </div>
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
    issues: issuesSelector(state),
    lastPage: lastPageSelector(state),
    baseUrl: issuesBaseURLSelector(state),
    currentPage: pageSelector(state),
    perPage: itemsQuantitySelector(state),
  }),
  { fetchIssues, goToIssuePage, paginatorRequest }
)(Issues)
