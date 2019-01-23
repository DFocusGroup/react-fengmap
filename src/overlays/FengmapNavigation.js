import FengmapBaseOverlay from '../bases/FengmapBaseOverlay'
import PropTypes from 'prop-types'

class FengmapNavigation extends FengmapBaseOverlay {
  static propTypes = {
    naviOptions: PropTypes.shape({
      speed: PropTypes.number,
      followPosition: PropTypes.bool,
      followAngle: PropTypes.bool,
      changeTiltAngle: PropTypes.bool,
      scaleLevel: PropTypes.number,
      offsetHeight: PropTypes.number,
      lineStyle: PropTypes.object
    }),
    start: PropTypes.shape({
      options: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        groupID: PropTypes.number,
        url: PropTypes.string,
        size: PropTypes.number,
        callback: PropTypes.func
      }),
      noMarker: PropTypes.bool
    }),
    end: PropTypes.shape({
      options: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        groupID: PropTypes.number,
        url: PropTypes.string,
        size: PropTypes.number,
        callback: PropTypes.func
      }),
      noMarker: PropTypes.bool
    })
  }

  load = (map, fengmapSDK, parent) => {
    const { naviOptions } = this.props

    this._createNavigation(map, fengmapSDK, naviOptions)
  }

  _createNavigation = (map, fengmapSDK, naviOptions) => {
    this.map = map
    this.fengmapSDK = fengmapSDK
    this.navigation = new fengmapSDK.FMNavigation({
      ...(naviOptions || {}),
      map: map
    })

    this._setRoute({}, this.props)
  }

  _setRoute = (prev, props) => {
    if (props.start !== prev.start || props.end !== prev.end) {
      this.navigation.clearAll()
    }
    if (props.start && props.start.options) {
      this.navigation.setStartPoint(props.start.options, props.start.noMarker)
    }
    if (props.end && props.end.options) {
      this.navigation.setEndPoint(props.end.options, props.end.noMarker)
    }

    if (props.start && props.end) {
      this.navigation.drawNaviLine()
    }
  }

  componentDidUpdate(prev) {
    this._setRoute(prev || {}, this.props)
  }

  _destroy = () => {
    if (this.navigation) {
      this.navigation.clearAll()
    }
  }

  componentWillUnmount() {
    this._destroy()
  }

  render() {
    return null
  }
}

export default FengmapNavigation
