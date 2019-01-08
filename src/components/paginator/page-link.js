import React from 'react'
import PropTypes from 'prop-types'

function PageLink({ url, text, goToPage, className }) {
  return (
    <div className={className} onClick={e => goToPage(e, url)}>
      <a href={url}>{text}</a>
    </div>
  )
}

PageLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  goToPage: PropTypes.func.isRequired,
}

export default PageLink
