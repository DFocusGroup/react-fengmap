import queryString from 'query-string'
import throttle from 'lodash/throttle'

import { withMixin } from '../helpers/dva'

export default withMixin({
  namespace: 'app',
  state: {
    locationPathname: '',
    locationQuery: {},
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  },
  subscriptions: {
    setHistory({ dispatch, history }) {
      return history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search)
          }
        })
      })
    },
    screenResize({ dispatch, history }) {
      const screenResizeHandler = () => {
        const { innerWidth, innerHeight } = window
        dispatch({
          type: 'updateState',
          payload: {
            screenWidth: innerWidth,
            screenHeight: innerHeight
          }
        })
      }
      const handler = throttle(screenResizeHandler, 250)
      handler()

      window.addEventListener('resize', handler)
      return () => {
        window.removeEventListener('resize', handler)
      }
    }
  },
  effects: {},
  reducers: {}
})
