import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

import { pick } from '../helpers/object'

class FengmapImageMarker extends FengmapBaseControl {
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
    this.map = map
    this.groupLayer = map.getFMGroup(map.focusGroupID)
    this.layer = new fengmapSDK.FMImageMarkerLayer()
    this.groupLayer.addLayer(this.layer)
    this.marker = new fengmapSDK.FMImageMarker({
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
    this.marker.setPosition(pick(opts, ['x', 'y']), this.map.focusGroupID, opts.height)
  }

  componentWillUnmount() {
    this.layer.removeAll()
    this.groupLayer.removeLayer(this.layer)
  }

  render() {
    return null
  }
}

export default FengmapImageMarker
