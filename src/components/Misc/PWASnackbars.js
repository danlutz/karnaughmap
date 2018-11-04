import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import useProgressiveWebApp from '../../hooks/useProgressiveWebApp'

const anchorOrigin = {
  vertical: 'bottom',
  horizontal: 'right'
}

const PWASnackbars = () => {
  const [firstInstallOpen, setFirstInstallOpen] = useState(false)
  const [newContentOpen, setNewContentOpen] = useState(false)

  useProgressiveWebApp({
    onFirstInstall: () => setFirstInstallOpen(true),
    onNewContent: () => setNewContentOpen(true)
  })

  return (
    <>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={firstInstallOpen}
        autoHideDuration={3000}
        onClose={() => setFirstInstallOpen(false)}
        ContentProps={{
          'aria-describedby': 'offline-message'
        }}
        message={
          <span id="offline-message">
            App has been installed, it now works offline!
          </span>
        }
      />
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={newContentOpen}
        autoHideDuration={3000}
        onClose={() => setNewContentOpen(false)}
        ContentProps={{
          'aria-describedby': 'new-content-message'
        }}
        message={
          <span id="new-content-message">
            New content available! Please close and reopen tab.
          </span>
        }
      />
    </>
  )
}

export default PWASnackbars
