import React from 'react'
import styles from './styles/loader.module.css'
function Loader() {
  return (
    <div className={styles['container']}>
      <div className={styles['lds-grid']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader
