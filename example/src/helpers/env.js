export const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
export const isProduction = process.env.NODE_ENV === 'production'

export function resolvePublicPath(pathname) {
  if (isProduction) {
    return `${
      window.routerBase.endsWith('/') ? window.routerBase.slice(0, window.routerBase.length - 1) : window.routerBase
    }${pathname}`
  }
  return pathname
}
