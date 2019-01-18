import React from 'react'
import PropTypes from 'prop-types'
import styles from './dropdown-list.module.css'

function DropdownList({
  repoes,
  activeItem,
  onGoToRepo,
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
          className={activeItem.num === i + 1 ? styles['active'] : null}
          onClick={() => onGoToRepo(r.name)}
          onMouseEnter={() => setActiveItem({ num: i + 1, name: r.name })}
        >
          {r.name}
        </li>
      ))}
    </ul>
  )
}

DropdownList.propTypes = {
  repoes: PropTypes.array.isRequired,
  typedValue: PropTypes.string,
  owner: PropTypes.string,
  activeItem: PropTypes.shape({
    num: PropTypes.number.isRequired,
    name: PropTypes.string,
  }).isRequired,
  onGoToRepo: PropTypes.func.isRequired,
  setActiveItem: PropTypes.func.isRequired,
}

export default DropdownList
