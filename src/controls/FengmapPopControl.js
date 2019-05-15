import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export default class FengmapPopControl extends FengmapBaseControl {
  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    visible: PropTypes.bool,
    fidPosition: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
    }),
    ctrlOptions: PropTypes.shape({
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
      scrollTop: getheight(),
      parentLeft: 0,
      parentTop: 0
    }
  }

  load = (map, fengmapSDK, parent) => {
    this.setState({
      map: map,
      parent
    })
    setTimeout(() => {
      const element = this.container.current
      // 获取父元素 的 offsetLeft  offsetTop 和当前的滚动高度
      const parentLeft = element.parentNode.offsetLeft
      const parentTop = element.parentNode.offsetTop
      this.container.current.style.display = 'block'
      const scrollTop = getheight()
      this.setState(
        {
          parentTop,
          parentLeft,
          scrollTop
        },
        () => {
          this._updateInfoWindow()
        }
      )
      window.addEventListener('scroll', this.scrollHandler)
    }, 0)
  }

  unload = () => {
    const { map } = this.state
    // 移除监听事件 并把 map制空 让pop消失
    window.removeEventListener('scroll', this.scrollHandler)
    map.off('update')
    this.listened = false
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
    this.renderChildren()
  }

  scrollHandler = event => {
    let scrollTop = getheight()
    this.setState(
      {
        scrollTop
      },
      () => {
        this._updateInfoWindow()
      }
    )
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
    if (!map || this.listened) {
      return
    }
    this._updateInfoWindow()
    this.listened = true
    map.on('update', this._updateInfoWindow)
  }

  _updateInfoWindow = () => {
    const { map, scrollTop, parentLeft, parentTop } = this.state
    const { fidPosition, ctrlOptions } = this.props
    if (!map || !fidPosition || !this.container.current) {
      return
    }

    let x = parentLeft
    let y = parentTop
    if (ctrlOptions && ctrlOptions.offset && ctrlOptions.offset.x) {
      x = ctrlOptions.offset.x
    }
    if (ctrlOptions && ctrlOptions.offset && ctrlOptions.offset.y) {
      y = ctrlOptions.offset.y
    }

    const element = this.container.current
    const initPosition = {
      ...fidPosition
    }
    const mapPosition = map.coordMapToScreen(initPosition.x, initPosition.y, initPosition.z)
    const top = mapPosition.y + y - scrollTop + 'px'
    const left = mapPosition.x + x + 'px'
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
