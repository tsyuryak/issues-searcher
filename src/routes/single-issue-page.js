import React from 'react'
import SingleIssue from '../components/issues/single-issue'

function SingleIssuePage({ match }) {
  return (
    <div>
      <SingleIssue url={match.url} />
    </div>
  )
}

export default SingleIssuePage
