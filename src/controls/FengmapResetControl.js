import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

const RESET_STYLE = {
  position: 'absolute',
  width: '42PX',
  height: '42PX',
  backgroundSize: 'contain',
  boxShadow: 'rgba(0, 0, 0, 0.3) 2px 2px 3px',
  cursor: 'pointer',
  backgroundColor: '#fff'
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
      parent: null,
      map: null,
      mapOnloadOver: false
    }
    this.btnRef = React.createRef()
  }

  load = (map, fengmapSDK, parent) => {
    const { ctrlOptions } = this.props
    this.setState({
      map,
      ctrlOptions,
      parent
    })
    setTimeout(() => {
      this.setState({
        mapOnloadOver: true
      })
    }, 200)
  }

  resetMap = () => {
    this.setState({
      mapOnloadOver: false
    })
    const original = this.btnRef.current.style['pointer-events'] || 'auto'
    this.btnRef.current.style['pointer-events'] = 'none'
    const { parent } = this.state
    parent._destroy()
    parent._loadMap(parent.props.mapId).then(() => {
      this.btnRef.current.style['pointer-events'] = original
    })
  }

  render() {
    const { ctrlOptions, map, mapOnloadOver } = this.state
    if (!map) {
      return null
    }
    return (
      <div
        ref={this.btnRef}
        onClick={this.resetMap}
        style={Object.assign({}, RESET_STYLE, getResetPosition(ctrlOptions), {
          display: mapOnloadOver ? 'block' : 'none'
        })}
      />
    )
  }
}

export default FengmapResetControl

function getResetPosition(ctrlOptions) {
  let x = 0
  let y = 0
  const { position } = ctrlOptions
  if (ctrlOptions.hasOwnProperty('offset')) {
    x = ctrlOptions.offset.x
    y = ctrlOptions.offset.y
  }

  const { imgURL } = ctrlOptions

  switch (position) {
    case 1:
      return { left: `${10 + x}px`, top: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 3:
      return { right: `${10 + x}px`, top: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 2:
      return { left: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    case 4:
      return { right: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: `url(${imgURL})` }
    default:
      return { right: `${10 + x}px`, bottom: `${50 + y}px`, backgroundImage: "url('/assets/reset.png')" }
  }
}
