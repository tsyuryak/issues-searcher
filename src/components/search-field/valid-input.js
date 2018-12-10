import React from 'react'

function ValidInput({ events, value }) {
  return (
    <>
      <input
        autoComplete="off"
        type="search"
        name="search"
        id="search-field"
        placeholder="an owner and its repo"
        maxLength="64"
        onChange={e => events.onInputText(e.target.value)}
        onKeyUp={e => events.onKeyPressHandler(e.keyCode)}
        value={value}
      />
    </>
  )
}

export default ValidInput
