import React from 'react'
import { toLocalDateTime } from '../../../helpers'
import styles from './issues-list-item.module.css'

function IssuesListItem({ number, title, dateTime }) {
  const ldt = toLocalDateTime(dateTime)
  return (
    <ul>
      <li>
        <span className={styles['number-item']}>{number}</span>
      </li>
      <li>
        <div className={styles['title-item']}>{title}</div>
      </li>
      <li>
        <span className={styles['datetime-item']}>{ldt.date}</span>
        <span className={styles['datetime-item']}>{ldt.time}</span>
      </li>
    </ul>
  )
}

export default IssuesListItem
