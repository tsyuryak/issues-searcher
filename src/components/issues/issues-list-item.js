import React from 'react'
import { toLocalDateTime } from '../../helpers'

function IssuesListItem({ number, title, dateTime }) {
  const ldt = toLocalDateTime(dateTime)
  return (
    <>
      <td>{number}</td>
      <td>{title}</td>
      <td>
        {ldt.date} {ldt.time}
      </td>
    </>
  )
}

export default IssuesListItem
