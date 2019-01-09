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
  setListLength,
}) {
  const filteredList = repoes.filter(r => r.name.includes(typedValue))
  if (!visible || filteredList.length === 0) {
    return null
  }
  setListLength(filteredList.length)
  return (
    <ul
      className={styles['repo-list']}
      onMouseEnter={() => resetActiveItem()}
      onMouseLeave={() => resetActiveItem()}
    >
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
  activeItem: PropTypes.number.isRequired,
  onGoToRepo: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  setListLength: PropTypes.func.isRequired,
}

export default DropdownList
