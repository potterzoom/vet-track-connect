import * as Sentry from '@sentry/react'

export function initSentry() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      tracesSampleRate: 0.1,
      beforeSend(event) {
        // Filter out development errors
        if (import.meta.env.DEV) {
          return null
        }
        return event
      },
      integrations: [
        // Add integrations when available
      ],
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  console.error('Error captured:', error, context)
  
  if (import.meta.env.PROD) {
    Sentry.withScope((scope) => {
      if (context) {
        Object.keys(context).forEach(key => {
          scope.setTag(key, context[key])
        })
      }
      Sentry.captureException(error)
    })
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  console.log(`[${level.toUpperCase()}] ${message}`)
  
  if (import.meta.env.PROD) {
    Sentry.captureMessage(message, level)
  }
}