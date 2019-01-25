import React from 'react'
import SingleIssue from '../components/issues/single-issue/single-issue'
import styles from './styles/single-issue-page.module.css'

function SingleIssuePage({ match }) {
  return (
    <div className={styles['container']}>
      <SingleIssue url={match.url} />
    </div>
  )
}

export default SingleIssuePage
