import React from 'react'
import styles from './issue-view.module.css'

function IssueView({ avatar_url, login, html_url, title, body, goBack }) {
  return (
    <div className={styles['issue']}>
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
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default IssueView
