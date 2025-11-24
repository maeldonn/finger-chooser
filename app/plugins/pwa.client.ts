import { useRegisterSW } from 'virtual:pwa-register/vue'

export default defineNuxtPlugin(() => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  useRegisterSW({
    immediate: true,
    onRegisteredSW(swUrl) {
      if (process.dev) {
        console.info('Service worker registered:', swUrl)
      }
    },
    onRegisterError(error) {
      console.error('Service worker registration failed:', error)
    }
  })
})
