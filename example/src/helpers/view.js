import { RawRoutes } from '../Document/Routes'

export function destoryGlobalSpinner() {
  const splash = document.querySelector('#splash-spinner')
  const spinner = document.querySelector('.spinner')
  if (splash) {
    document.head.removeChild(splash)
  }
  if (spinner) {
    document.body.removeChild(spinner)
  }
}

export function getRouteDefinition(pathname) {
  const found = RawRoutes.find(r => r.url === pathname)

  if (!found) {
    return null
  }
  return found
}
