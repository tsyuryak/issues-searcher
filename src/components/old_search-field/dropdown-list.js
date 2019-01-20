import React from 'react'

function DropdownList({ repos, onClickHandler, className }) {
  return (
    <ul className={className}>
      {repos.map(repo => (
        <li key={repo.id}>
          <div onClick={() => onClickHandler(repo.name)}>{repo.name}</div>
        </li>
      ))}
    </ul>
  )
}

export default DropdownList
