import React from 'react'
import PropTypes from 'prop-types'

function DropdownList({ visible }) {
  if (!visible) {
    return null
  }
  return <div>DDL</div>
}

DropdownList.propTypes = {
  visible: PropTypes.bool.isRequired,
}

export default DropdownList
