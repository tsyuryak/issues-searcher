import React from 'react'
import Issues from '../components/issues/issues-list'
import { connect } from 'react-redux'

function IssuesPage({ match, locationKey }) {
  const { owner, repo } = match.params
  return (
    <div>
      <Issues key={locationKey} owner={owner} repo={repo} />
    </div>
  )
}

export default connect(state => ({
  locationKey: state.router.location.key,
}))(IssuesPage)
