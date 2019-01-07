import React from 'react'
import SearchField from '../components/search-field'
import styles from './styles/home-page.module.css'

function HomePage() {
  return (
    <div className={styles['container']}>
      <h1>ISSUES SEARCHER</h1>
      <div className={styles['search-field']}>
        <SearchField />
      </div>
    </div>
  )
}

export default HomePage
