import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'
const RESET_STYLE = {
  position: 'absolute',
  width: '42PX',
  height: '42PX',
  backgroundSize: 'contain',
  boxShadow: '0px 6px 14px 3px rgba(0, 0, 0, 0.11)'
}
class FengmapResetControl extends FengmapBaseControl {
  static propTypes = {
    ctrlOptions: PropTypes.shape({
      position: PropTypes.string
    }).isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      ctrlOptions: null,
      parent: null
    }
  }
  load = (map, fengmapSDK, parent) => {
    const { ctrlOptions } = this.props
    this.setState({
      ctrlOptions,
      parent
    })
  }
  resetMap = () => {
    const { parent } = this.state
    if (parent) {
      parent._loadMap(parent.props.mapId)
    }
  }
  render() {
    const { ctrlOptions } = this.state
    let resetPosition = ''
    if (ctrlOptions) {
      resetPosition = setResetPosition(ctrlOptions)
    }
    return <div onClick={this.resetMap} style={Object.assign({}, RESET_STYLE, resetPosition)} />
  }
}

export default FengmapResetControl
function setResetPosition(ctrlOptions) {
  const { position } = ctrlOptions
  let { imgURL } = ctrlOptions
  switch (position) {
    case 'LEFT_TOP':
      return { left: '10px', top: '20px', backgroundImage: `url(${imgURL})` }
    case 'RIGHT_TOP':
      return { right: '10px', top: '20px', backgroundImage: `url(${imgURL})` }
    case 'LEFT_BOTTOM':
      return { left: '10px', bottom: '20px', backgroundImage: `url(${imgURL})` }
    case 'RIGHT_BOTTOM':
      return { right: '10px', bottom: '20px', backgroundImage: `url(${imgURL})` }
    default:
      return { right: '10px', top: '20px', backgroundImage: "url('/assets/reset.png')" }
  }
}
