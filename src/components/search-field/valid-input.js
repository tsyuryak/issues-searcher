import React from 'react'
import styles from './styles/valid-input.module.css'

function ValidInput({ events, error, value }) {
  return (
    <div className={styles['valid-input']}>
      <input
        type="search"
        onChange={e => events.onInputText(e.target.value)}
        onKeyUp={e => events.onKeyPressHandler(e.keyCode)}
        value={value}
      />
      {error && <span>{error}</span>}
    </div>
  )
}

export default ValidInput
