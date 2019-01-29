import React from 'react'
import PropTypes from 'prop-types'

function PageLink({ visible, url, text, goToPage, className }) {
  return visible ? (
    <div className={className} onClick={() => goToPage()}>
      {text}
    </div>
  ) : null
}

PageLink.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  goToPage: PropTypes.func.isRequired,
}

export default PageLink
