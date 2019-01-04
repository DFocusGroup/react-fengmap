import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isChildrenValid } from './helpers/validator'
import { isArray } from './helpers/object'
import { isOrderIE } from './helpers/browser'
import { setFloorsByGroupId, setFloorsToMapInstance } from './helpers/map'

const EVENTS = [
  'focusGroupIDChanged',
  'loadComplete',
  'mapClickNode',
  'mapHoverNode',
  'mapScaleLevelChanged',
  'scaleLevelChanged',
  'visibleGroupIDsChanged'
]

const INNER_STYLE = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0px',
  left: '0px',
  backgroundColor: '#fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

class FengmapBase extends Component {
  static propTypes = {
    isFengmapBase: PropTypes.bool,
    reference: PropTypes.any,
    mapOptions: PropTypes.object.isRequired,
    events: PropTypes.object,
    mapId: PropTypes.string,
    style: PropTypes.object,
    fengmapSDK: PropTypes.any.isRequired,
    loadingTxt: PropTypes.string,
    supportTxt: PropTypes.string,
    gestureEnableController: PropTypes.shape({
      enableMapPan: PropTypes.bool,
      enableMapPinch: PropTypes.bool,
      enableMapRotate: PropTypes.bool,
      enableMapIncline: PropTypes.bool
    }),
    children: PropTypes.any
  }

  static defaultProps = {
    loadingTxt: '地图加载中...',
    supportTxt: '您使用的浏览器暂不支持地图，请升级或改用Chrome获取更好的服务'
  }

  constructor(props) {
    super(props)

    this.mapContainer = React.createRef()
    this.loadingTxt = React.createRef()

    isChildrenValid(props.children)

    this.refs = null

    this.isFengmapBase = props.isFengmapBase === undefined ? true : props.isFengmapBase
  }

  _loadMap = mapId => {
    const { mapOptions, events, fengmapSDK } = this.props
    if (!mapId || !fengmapSDK || isOrderIE()) {
      return
    }
    if (this.mapInstance) {
      this.mapContainer.current.innerHTML = ''
    }
    this.mapInstance = new fengmapSDK.FMMap(Object.assign({}, mapOptions, { container: this.mapContainer.current }))

    EVENTS.forEach(e => {
      this.mapInstance.on(e, event => {
        if (e === 'loadComplete') {
          this.loadingTxt.current.style['zIndex'] = -10
          this._configGestureEnableController()
          this._initAllChildren(this.mapInstance)
          setFloorsByGroupId(this.mapInstance)
          setFloorsToMapInstance(this.mapInstance)
        }
        if (e === 'focusGroupIDChanged') {
          setFloorsByGroupId(this.mapInstance)
        }
        if (events && events[e]) {
          events[e](event, this.mapInstance)
        }
        if (events.mapHoverNode) {
          this.mapInstance.gestureEnableController.enableMapHover = true
        } else {
          this.mapInstance.gestureEnableController.enableMapHover = false
        }
      })
    })

    this.mapInstance.openMapById(mapId)
  }

  _configGestureEnableController = () => {
    const { gestureEnableController } = this.props
    if (gestureEnableController) {
      Object.keys(gestureEnableController).forEach(key => {
        this.mapInstance.gestureEnableController[key] = gestureEnableController[key]
      })
    }
  }

  _initAllChildren = map => {
    const { fengmapSDK } = this.props
    const { refs } = this
    if (!isArray(refs)) {
      return
    }
    refs.forEach(ref => {
      ref.current.load(map, fengmapSDK, this)
    })
  }

  componentDidMount() {
    this._loadMap(this.props.mapId)
    if (this.loadingTxt && this.loadingTxt.current) {
      this.loadingTxt.current.style['zIndex'] = 10
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.mapId === this.props.mapId) {
      return
    }
    this._loadMap(this.props.mapId)
  }

  componentWillUnmount() {
    if (!this.mapInstance) {
      return
    }
    EVENTS.forEach(e => {
      this.mapInstance.off(e)
    })
  }

  render() {
    const { style, loadingTxt, children, reference } = this.props

    if (isOrderIE()) {
      return (
        <div
          style={Object.assign({}, style, {
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center'
          })}
        >
          <span style={{ display: 'inline-block' }}>{this.props.supportTxt}</span>
        </div>
      )
    }

    const cloneChildren = cloneElements(children)
    if (cloneChildren) {
      this.refs = cloneChildren.map(c => c.ref)
    }
    return (
      <div style={Object.assign({}, style, { position: 'relative' })} ref={reference}>
        <div ref={this.mapContainer} style={INNER_STYLE} />
        <div ref={this.loadingTxt} style={INNER_STYLE}>
          {loadingTxt}
        </div>
        {cloneChildren ? cloneChildren.map(c => c.child) : null}
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => <FengmapBase reference={ref} {...props} />)

function cloneElements(children) {
  if (!children) {
    return null
  }
  if (!isArray(children)) {
    const ref = React.createRef()
    return [
      {
        child: React.cloneElement(children, {
          key: 'onlyone',
          ref
        }),
        ref
      }
    ]
  }
  return children.map((child, i) => {
    const ref = React.createRef()
    return {
      child: React.cloneElement(child, {
        ref,
        key: i
      }),
      ref
    }
  })
}
