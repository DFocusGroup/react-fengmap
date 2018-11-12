import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

import rotateIcon from '../assets/icon-rotate-7.jpg'

const INLINE_STYLE = {
  width: '45px',
  height: '45px',
  zIndex: '10',
  cursor: 'pointer',
  backgroundColor: '#fff',
  boxShadow: 'rgba(0, 0, 0, 0.3) 2px 2px 3px',
  borderRadius: '2px'
}

const INNER_STYLE = {
  width: '35px',
  height: '35px',
  position: 'absolute',
  top: '50%',
  marginTop: '-17.5px',
  left: '50%',
  marginLeft: '-18.5px'
}

class FengmapRotateControl extends FengmapBaseControl {
  static propTypes = {
    ctrlOptions: PropTypes.shape({
      position: PropTypes.number,
      offset: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    }).isRequired,
    angle(props, propName, componentName) {
      if (props[propName] === undefined) {
        return true
      }
      if (Object.prototype.toString.call(props[propName]) !== '[object Number]') {
        throw new Error(
          'Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Must be number > 0 && < 360'
        )
      }
    }
  }

  static defaultProps = {
    angle: 15
  }

  constructor(props) {
    super(props)

    this.state = {
      style: {},
      POSITIONS: [],
      loaded: false
    }

    this.rotateControl = React.createRef()
  }

  _getFinalStyle = (props, POSITIONS) => {
    const { ctrlOptions } = props
    if (!ctrlOptions) {
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', bottom: '15px', right: '15px' })
    }

    if (POSITIONS.indexOf(ctrlOptions.position) < 0) {
      if (ctrlOptions.offset) {
        return Object.assign({}, INLINE_STYLE, {
          position: 'absolute',
          top: `${ctrlOptions.offset.y}px`,
          left: `${ctrlOptions.offset.x}px`
        })
      }
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', bottom: '15px', right: '15px' })
    }

    if (ctrlOptions.position === POSITIONS[0]) {
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', bottom: '15px', left: '15px' })
    }
    if (ctrlOptions.position === POSITIONS[1]) {
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', top: '15px', left: '15px' })
    }
    if (ctrlOptions.position === POSITIONS[2]) {
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', bottom: '15px', right: '15px' })
    }
    if (ctrlOptions.position === POSITIONS[3]) {
      return Object.assign({}, INLINE_STYLE, { position: 'absolute', top: '15px', right: '15px' })
    }
  }

  load = (map, fengmapSDK, parent) => {
    const POSITIONS = [
      fengmapSDK.controlPositon.LEFT_BOTTOM,
      fengmapSDK.controlPositon.LEFT_TOP,
      fengmapSDK.controlPositon.RIGHT_BOTTOM,
      fengmapSDK.controlPositon.RIGHT_TOP
    ]

    this.setState(
      {
        style: this._getFinalStyle(this.props, POSITIONS),
        POSITIONS,
        loaded: true
      },
      () => {
        const elem = this.rotateControl.current
        if (!elem) {
          return
        }
        elem.addEventListener(
          'click',
          () => {
            map.rotateAngle = this._getNextRotateAngle(map.rotateAngle)
          },
          false
        )
      }
    )
  }

  _getNextRotateAngle = rotateAngle => {
    const { angle } = this.props
    let next = rotateAngle + angle
    if (next <= 360) {
      return next
    }
    return next - 360
  }

  render() {
    const { loaded, style } = this.state
    if (!loaded) {
      return null
    }
    return (
      <div style={style} ref={this.rotateControl}>
        <img src={rotateIcon} style={INNER_STYLE} alt="" />
      </div>
    )
  }
}

export default FengmapRotateControl
