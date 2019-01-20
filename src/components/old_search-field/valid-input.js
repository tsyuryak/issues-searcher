import React from 'react'

function ValidInput({ events, error, value }) {
  const style = error ? { color: 'red' } : { color: 'black' }
  return (
    <>
      <input
        style={style}
        autoComplete="off"
        type="search"
        name="search"
        id="search-field"
        placeholder="an owner and its repo"
        maxLength="64"
        onChange={e => events.onInputText(e.target.value)}
        onKeyUp={e => events.onKeyPressHandler(e.keyCode)}
        value={value}
        onFocus={e => error && e.target.select()}
      />
    </>
  )
}

export default ValidInput
