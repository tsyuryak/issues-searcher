import React from 'react'
import PropTypes from 'prop-types'
import styles from './dropdown-list.module.css'

function DropdownList({
  repoes,
  activeItem,
  onGoToIssues,
  setActiveItem,
  resetActiveItem,
}) {
  return (
    <ul
      className={styles['repo-list']}
      onMouseEnter={() => resetActiveItem()}
      onMouseLeave={() => resetActiveItem()}
    >
      {repoes.map((r, i) => (
        <li
          key={r.id}
          className={activeItem.id === i + 1 ? styles['active'] : null}
          onClick={() => onGoToIssues()}
          onMouseEnter={() => setActiveItem({ itemId: i + 1, name: r.name })}
        >
          {r.name}
        </li>
      ))}
    </ul>
  )
}

DropdownList.propTypes = {
  repoes: PropTypes.array.isRequired,
  owner: PropTypes.string,
  activeItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    repo: PropTypes.string,
  }).isRequired,
  onGoToIssues: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
}

export default DropdownList
