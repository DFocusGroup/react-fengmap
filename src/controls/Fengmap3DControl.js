import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

class Fengmap3DControl extends FengmapBaseControl {
  static propTypes = {
    ctrlOptions: PropTypes.shape({
      position: PropTypes.number,
      offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      }),
      imgURL: PropTypes.string
    }).isRequired
  }

  load = (map, fengmapSDK, parent) => {
    const { ctrlOptions } = this.props
    new fengmapSDK.toolControl(map, ctrlOptions)
  }

  render() {
    return null
  }
}

export default Fengmap3DControl
