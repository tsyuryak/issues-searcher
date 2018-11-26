import React from 'react'

function ValidInput({ inputText, error }) {
  return (
    <div>
      <input type="search" onChange={e => inputText(e.target.value)} />
      {error && <span>{error}</span>}
    </div>
  )
}

export default ValidInput
