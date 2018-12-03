import React from 'react'
import Issues from '../components/issues/issues-list'
import { connect } from 'react-redux'
import Paginator from '../components/issues/issues-paginator'
import { paginatorSelector } from '../ducks/issues'

function IssuesPage({ match, locationKey, paginator }) {
  const { owner, repo, perpage, page } = match.params
  return (
    <div>
      <Issues
        key={locationKey}
        owner={owner}
        repo={repo}
        perPage={perpage}
        page={page}
      />
      {paginator.hasPages && <Paginator owner={owner} repo={repo} />}
    </div>
  )
}

export default connect(state => ({
  locationKey: state.router.location.key,
  paginator: paginatorSelector(state),
}))(IssuesPage)
