import FengmapBaseOverlay from '../bases/FengmapBaseOverlay'
import PropTypes from 'prop-types'

import { pick } from '../helpers/object'

class FengmapImageMarker extends FengmapBaseOverlay {
  static propTypes = {
    opts: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      size: PropTypes.number,
      height: PropTypes.number,
      url: PropTypes.string,
      callback: PropTypes.func
    }).isRequired
  }

  load = (map, fengmapSDK, parent) => {
    const { opts } = this.props

    this._createMarker(map, fengmapSDK, opts)
  }

  _createMarker = (map, fengmapSDK, opts) => {
    this.map = map
    this.fengmapSDK = fengmapSDK
    this.focusGroupID = this.map.focusGroupID
    this.groupLayer = this.map.getFMGroup(this.map.focusGroupID)
    this.layer = new this.fengmapSDK.FMImageMarkerLayer()
    this.groupLayer.addLayer(this.layer)
    this.marker = new this.fengmapSDK.FMImageMarker({
      ...opts,
      callback: () => {
        this.marker.alwaysShow()
        if (opts.callback) {
          opts.callback(this.marker)
        }
      }
    })
    this.layer.addMarker(this.marker)
  }

  componentDidUpdate(prev) {
    if (prev.opts === this.props.opts) {
      return
    }
    const { opts } = this.props
    if (this.focusGroupID === this.map.focusGroupID) {
      this.marker.setPosition(pick(opts, ['x', 'y']), this.map.focusGroupID, opts.height)
      return
    }

    this._destroy()

    this._createMarker(this.map, this.fengmapSDK, opts)
  }

  _destroy = () => {
    if (this.layer) {
      this.layer.removeAll()
    }
    if (this.groupLayer) {
      this.groupLayer.removeLayer(this.layer)
    }
  }

  componentWillUnmount() {
    this._destroy()
  }

  render() {
    return null
  }
}

export default FengmapImageMarker
