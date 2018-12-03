import React from 'react'
import styles from './styles/loader.module.css'

function Loader() {
  const style = {
    zIndex: 110,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignContent: 'center',
  }
  return (
    <div style={style}>
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
