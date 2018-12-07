import React from 'react'
import SingleIssue from '../components/issues/single-issue'
import SearchField from '../components/search-field'
import styles from './styles/single-issue-page.module.css'

function SingleIssuePage({ match }) {
  return (
    <div className={styles['container']}>
      <SearchField />
      <SingleIssue url={match.url} />
    </div>
  )
}

export default SingleIssuePage
