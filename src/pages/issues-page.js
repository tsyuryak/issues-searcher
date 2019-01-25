import React from 'react'
import { connect } from 'react-redux'
import Issues from '../components/issues/issues'
import styles from './styles/issues-page.module.css'

function IssuesPage({ match, locationKey }) {
  const { owner, repo, perpage, page } = match.params

  return (
    <div className={styles['container']}>
      <Issues
        key={locationKey}
        params={{ owner, repo, itemsQuantity: perpage, page }}
      />
    </div>
  )
}

export default connect(state => ({
  locationKey: state.router.location.key,
}))(IssuesPage)
