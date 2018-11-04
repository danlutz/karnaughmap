import React, { useState } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import useProgressiveWebApp from '../../hooks/useProgressiveWebApp'

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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
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
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setFirstInstallOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
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
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setNewContentOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </>
  )
}

export default PWASnackbars
