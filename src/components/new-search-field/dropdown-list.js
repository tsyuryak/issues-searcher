import React from 'react'
import PropTypes from 'prop-types'
import styles from './dropdown-list.module.css'

function DropdownList({ visible, repoes = [] }) {
  if (!visible) {
    return null
  }
  return (
    <ul className={styles['repo-list']}>
      {repoes.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </ul>
  )
}

DropdownList.propTypes = {
  visible: PropTypes.bool.isRequired,
  repoes: PropTypes.array.isRequired,
}

export default DropdownList
