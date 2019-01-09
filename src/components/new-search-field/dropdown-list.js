import React from 'react'
import PropTypes from 'prop-types'
import styles from './dropdown-list.module.css'

function DropdownList({ visible, repoes, typedValue, owner, onGoToRepo }) {
  const filteredList = repoes.filter(r => r.name.includes(typedValue))
  if (!visible || filteredList.length === 0) {
    return null
  }
  return (
    <ul className={styles['repo-list']}>
      {filteredList.map(r => (
        <li key={r.id} onClick={() => onGoToRepo(owner, r.name)}>
          {r.name}
        </li>
      ))}
    </ul>
  )
}

DropdownList.defaultProps = {
  repoes: [],
  typedValue: '',
}

DropdownList.propTypes = {
  visible: PropTypes.bool.isRequired,
  repoes: PropTypes.array.isRequired,
  typedValue: PropTypes.string,
  owner: PropTypes.string.isRequired,
  onGoToRepo: PropTypes.func.isRequired,
}

export default DropdownList
