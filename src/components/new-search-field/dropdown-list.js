import React from 'react'
import PropTypes from 'prop-types'

function DropdownList({ visible, repoes = [] }) {
  if (!visible) {
    return null
  }
  return <ul>DDL</ul>
}

DropdownList.propTypes = {
  visible: PropTypes.bool.isRequired,
  repoes: PropTypes.array.isRequired,
}

export default DropdownList
