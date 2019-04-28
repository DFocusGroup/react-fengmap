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
      position: PropTypes.number,
      offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
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
  let x = 0
  let y = 0
  const { position } = ctrlOptions
  if (ctrlOptions.hasOwnProperty('offset')) {
    x = ctrlOptions.offset.x
    y = ctrlOptions.offset.y
  }
  let { imgURL } = ctrlOptions
  switch (position) {
    case 1:
      return { left: `${10 + x}px`, top: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 2:
      return { right: `${10 + x}px`, top: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 3:
      return { left: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 4:
      return { right: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    default:
      return { right: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: "url('/assets/reset.png')" }
  }
}
