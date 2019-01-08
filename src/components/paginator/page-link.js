import React from 'react'
import PropTypes from 'prop-types'

function PageLink({ url, text, goToPage }) {
  return (
    <a href={url} onClick={e => goToPage(e, url)}>
      {text}
    </a>
  )
}

PageLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  goToPage: PropTypes.func.isRequired,
}

export default PageLink
