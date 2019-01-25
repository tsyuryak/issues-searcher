import React from 'react'
import styles from './issues-list.module.css'
import IssuesListItem from './issues-list-item'

function IssuesList({ issues, goToIssue }) {
  return (
    <ul className={styles['list']}>
      {issues.map(i => (
        <li
          className={styles['list-item']}
          key={i.id}
          onClick={() => goToIssue(i.url)}
        >
          <IssuesListItem
            number={i.number}
            title={i.title}
            dateTime={i.created_at}
          />
        </li>
      ))}
    </ul>
  )
}

export default IssuesList
