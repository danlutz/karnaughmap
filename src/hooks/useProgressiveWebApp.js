import { useEffect, useState } from 'react'

// Define the name of your events that will be dispatched
const firstInstallEventName = 'swFirstInstall' // custom
const newContentAvailableEventName = 'swNewContentAvailable' // custom
const installPromptEventName = 'beforeinstallprompt'
const onlineEventName = 'online'
const offlineEventName = 'offline'

export default ({ onFirstInstall = () => true, onNewContent = () => true }) => {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine)
  const [offlineAt, setOfflineAt] = useState(null)

  const handleInstallPrompt = e => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    // e.preventDefault()
    // Stash the event so it can be triggered later
    setInstallPrompt(e)
  }

  const handleOnline = () => {
    setOnlineStatus(true)
    setOfflineAt(null)
  }

  const handleOffline = () => {
    setOnlineStatus(false)
    setOfflineAt(new Date())
  }

  useEffect(() => {
    window.addEventListener(firstInstallEventName, onFirstInstall)
    window.addEventListener(newContentAvailableEventName, onNewContent)
    window.addEventListener(installPromptEventName, handleInstallPrompt)
    window.addEventListener(onlineEventName, handleOnline)
    window.addEventListener(offlineEventName, handleOffline)

    return () => {
      window.removeEventListener(firstInstallEventName, onFirstInstall)
      window.removeEventListener(newContentAvailableEventName, onNewContent)
      window.removeEventListener(installPromptEventName, handleInstallPrompt)
      window.removeEventListener(onlineEventName, handleOnline)
      window.removeEventListener(offlineEventName, handleOffline)
    }
  }, [])

  return { installPrompt, onlineStatus, offlineAt }
}

// This config can be passed to the serviceWorker.register() function created by CRA
export const serviceWorkerConfig = {
  onSuccess: () => window.dispatchEvent(new Event(firstInstallEventName)), // First install
  onUpdate: () => window.dispatchEvent(new Event(newContentAvailableEventName)) // New content cached
}
