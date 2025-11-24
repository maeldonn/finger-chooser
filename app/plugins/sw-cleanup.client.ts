let cleanupPromise: Promise<void> | null = null

const unregisterServiceWorkers = async () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  const registrations = await navigator.serviceWorker.getRegistrations()
  await Promise.all(
    registrations.map(async (registration) => {
      try {
        await registration.unregister()
      } catch {
        // ignore failures – we only need best-effort cleanup
      }
    })
  )
}

const clearLegacyCaches = async () => {
  if (!('caches' in window)) {
    return
  }

  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter((name) => /finger|chooser|vite|workbox/i.test(name))
      .map(async (name) => {
        try {
          await caches.delete(name)
        } catch {
          // cache deletion is best-effort, ignore errors
        }
      })
  )
}

export default defineNuxtPlugin(() => {
  if (cleanupPromise || !process.client) {
    return
  }

  cleanupPromise = Promise.allSettled([unregisterServiceWorkers(), clearLegacyCaches()]).then(() => {
    cleanupPromise = null
  })
})
