import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
// import { relative } from 'path'

export default class FengmapPopControl extends FengmapBaseControl {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    visible: PropTypes.bool,
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
      map: null,
      parent: null,
      scrollTop: getheight()
    }
  }

  load = (map, fengmapSDK, parent) => {
    this.setState({
      map: map,
      parent
    })
    setTimeout(() => {
      this.setState({
        mapOnloadOver: true
      })
    }, 200)
  }

  unload = () => {
    this.setState({
      map: null
    })
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
    const { map, scrollTop } = this.state
    const { topNumber = 550, leftNumber = 300, fidPosition } = this.props
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
    const { map } = this.state
    const { className, visible } = this.props
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

function getheight(height) {
  var scrollheight = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop
  return scrollheight
}
