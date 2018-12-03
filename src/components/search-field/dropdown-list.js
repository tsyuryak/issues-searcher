import React from 'react'
import styles from './styles/dropdown-list.module.css'

function DropdownList({ repos, onClickHandler }) {
  return (
    <div className={styles['dropdown']}>
      <ul>
        {repos.map(repo => (
          <li key={repo.id}>
            <div onClick={() => onClickHandler(repo.name)}>{repo.name}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DropdownList
