import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

class FengmapCompassControl extends FengmapBaseControl {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    image: PropTypes.shape({
      bg: PropTypes.string,
      fg: PropTypes.string
    }),
    onClick: PropTypes.func
  }

  load = (map, fengmapSDK, parent) => {
    const { visible } = this.props
    this.mapInstance = map
    map.showCompass = visible

    this._initImage()
    this._initClick()
  }

  _initImage = () => {
    const { image } = this.props
    const img = image || {}
    this.mapInstance.compass.setBgImage(img.bg)
    this.mapInstance.compass.setFgImage(img.fg)
  }

  _initClick = () => {
    const { onClick } = this.props
    this.mapInstance.off('mapClickCompass')
    if (!onClick) {
      return
    }
    this.mapInstance.on('mapClickCompass', (...args) => {
      onClick(this.mapInstance, ...args)
    })
  }

  componentDidUpdate(prev) {
    if (prev.visible !== this.props.visible) {
      this.mapInstance.showCompass = this.props.visible
    }
    if (prev.onClick !== this.props.onClick) {
      this._initClick()
    }
    if (prev.image !== this.props.image) {
      this._initImage()
    }
  }

  render() {
    return null
  }
}

export default FengmapCompassControl
