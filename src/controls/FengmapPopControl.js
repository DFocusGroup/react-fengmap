import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { relative } from 'path'

class Portal extends FengmapBaseControl {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    visible: PropTypes.bool,
    map: PropTypes.any,
    onClose: PropTypes.func,
    handleOk: PropTypes.func,
    fidPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    }),
    topNumber: PropTypes.number,
    leftNumber: PropTypes.number
  }
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.state = {
      map: props.map,
      fidPosition: props.fidPosition,
      visible: props.visible,
      parent: props.parent,
      scrollTop: getheight(),
      topNumber: props.topNumber,
      leftNumber: props.leftNumber
    }
  }
  renderChildren() {
    const container = document.createElement('div')
    document.body.appendChild(container)
    ReactDOM.unstable_renderSubtreeIntoContainer(this, React.Children.only(this.props.children), container)
    document.body.removeChild(container)
  }
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler)
    this.renderChildren()
    this._listenMapUpdate()
  }

  scrollHandler = event => {
    let scrollTop = getheight()
    this.setState({
      scrollTop
    })
  }

  componentDidUpdate(prevProps) {
    this._listenMapUpdate()
  }

  componentWillUnmount() {
    const { map } = this.state
    if (!map) {
      return
    }
    window.removeEventListener('scroll', this.scrollHandler)
    map.off('update')
  }

  _listenMapUpdate = () => {
    const { map } = this.state
    if (!map) {
      return
    }
    this._updateInfoWindow()
    map.listened = true
    map.on('update', this._updateInfoWindow)
  }

  _updateInfoWindow = () => {
    const { map, fidPosition, scrollTop, topNumber, leftNumber } = this.state
    if (!map || !fidPosition || !this.container.current) {
      return
    }
    const element = this.container.current
    const initPosition = {
      ...fidPosition,
      z: map.getGroupHeight(map.focusGroupID)
    }
    const mapPosition = map.coordMapToScreen(initPosition.x, initPosition.y, initPosition.z)
    const h = element.offsetHeight
    const w = element.offsetWidth / 2
    const top = mapPosition.y - h + topNumber - scrollTop + 'px'
    const left = mapPosition.x - w + leftNumber + 'px'
    element.style.top = top //弹出框上移一点 + 并且忽略header
    element.style.left = left //弹出框左移半个弹出框宽度，并且忽略左侧边栏
  }

  render() {
    const { visible, map } = this.state
    const { className } = this.props
    if (!visible || !map) {
      return null
    }
    return (
      <div ref={this.container} className={classnames(className)}>
        {this.props.children}
        <div />
      </div>
    )
  }
}

export default class Pop extends FengmapBaseControl {
  static propTypes = {
    className: PropTypes.string,
    positionArr: PropTypes.array,
    topNumber: PropTypes.number,
    leftNumber: PropTypes.number
  }
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      parent: null,
      positionArr: [],
      topNumber: 0,
      leftNumber: 0
    }
  }
  load = (map, fengmapSDK, parent) => {
    const { positionArr, topNumber, leftNumber } = this.props
    this.setState({
      map: map,
      parent,
      positionArr,
      topNumber: topNumber ? topNumber : 550,
      leftNumber: leftNumber ? leftNumber : 300
    })
    setTimeout(() => {
      this.setState({
        mapOnloadOver: true
      })
    }, 200)
  }

  unload = () => {
    console.log('卸载')
    this.setState({
      map: null
    })
  }
  render() {
    const { positionArr, map, topNumber, leftNumber } = this.state
    const { className } = this.props
    if (!map) {
      return null
    }
    return (
      <div style={{ position: relative, zIndex: -3 }}>
        {positionArr.map((value, index) => {
          const { visible, x, y } = value
          if (!visible) {
            return null
          }
          const obj = {
            fidPosition: {
              x,
              y
            },
            visible,
            map,
            topNumber,
            leftNumber
          }
          return (
            <Portal {...obj} className={className} key={index}>
              {this.props.children}
            </Portal>
          )
        })}
      </div>
    )
  }
}

function getheight(height) {
  var scrollheight = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
  return scrollheight
}
