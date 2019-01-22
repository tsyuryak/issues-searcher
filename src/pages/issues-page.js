import React from 'react'
import { connect } from 'react-redux'
import Issues from '../components/issues/issues-list'
import styles from './styles/issues-page.module.css'

function IssuesPage({ match, locationKey }) {
  const { owner, repo, perpage, page } = match.params

  return (
    <div className={styles['container']}>
      <div className={styles['issues']}>
        <Issues
          key={locationKey}
          params={{ owner, repo, itemsQuantity: perpage, page }}
        />
      </div>
    </div>
  )
}

export default connect(state => ({
  locationKey: state.router.location.key,
}))(IssuesPage)
