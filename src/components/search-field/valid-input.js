import React from 'react'

function ValidInput({ events, error, value }) {
  return (
    <div>
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
