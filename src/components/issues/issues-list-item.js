import React from 'react'
import { toLocalDateTime } from '../../helpers'

function IssuesListItem({ number, title, dateTime }) {
  const ldt = toLocalDateTime(dateTime)
  return (
    <React.Fragment>
      <td>{number}</td>
      <td>{title}</td>
      <td>
        {ldt.date} {ldt.time}
      </td>
    </React.Fragment>
  )
}

export default IssuesListItem
