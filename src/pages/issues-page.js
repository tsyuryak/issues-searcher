import React from 'react'
import Issues from '../components/issues/issues-list'
import { connect } from 'react-redux'
import Paginator from '../components/issues/issues-paginator'
import SearchField from '../components/search-field'
import styles from './styles/issues-page.module.css'

function IssuesPage({ match, locationKey }) {
  const { owner, repo, perpage, page } = match.params
  return (
    <div className={styles['container']}>
      <SearchField query={{ owner, repo }} key={locationKey} />
      <div className={styles['issues']}>
        <Issues
          key={locationKey}
          owner={owner}
          repo={repo}
          perPage={perpage}
          page={page}
        />
      </div>
      <Paginator
        owner={owner}
        repo={repo}
        currentPage={page}
        perPage={perpage}
      />
    </div>
  )
}

export default connect(state => ({
  locationKey: state.router.location.key,
}))(IssuesPage)