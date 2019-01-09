import React from 'react'
import PropTypes from 'prop-types'
import styles from './dropdown-list.module.css'

function DropdownList({
  visible,
  repoes,
  typedValue,
  owner,
  onGoToRepo,
  activeItem,
  resetActiveItem,
  setActiveItem,
}) {
  const filteredList = repoes.filter(r => r.name.includes(typedValue))
  if (!visible || filteredList.length === 0) {
    return null
  }
  return (
    <ul className={styles['repo-list']} onMouseEnter={() => resetActiveItem()}>
      {filteredList.map((r, i) => (
        <li
          key={r.id}
          className={activeItem === i ? styles['active'] : null}
          onClick={() => onGoToRepo(owner, r.name)}
          onMouseEnter={() => setActiveItem(i)}
        >
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
  activeItem: PropTypes.number.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
}

export default DropdownList
