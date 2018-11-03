import React from 'react'
import { Alert } from 'reactstrap'
import { supportsCSSGrid } from '../../utils/checkBrowserSupport'

const CssGridWarning = () => {
  if (supportsCSSGrid()) return null

  return (
    <Alert color="warning">
      You need to use a{' '}
      <a
        href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility"
        target="_blank"
        rel="noopener noreferrer"
      >
        browser that supports CSS Grid
      </a>{' '}
      to correctly display the map{' '}
      <span role="img" aria-label="warning emoji">
        ⚠️
      </span>
    </Alert>
  )
}

export default CssGridWarning
