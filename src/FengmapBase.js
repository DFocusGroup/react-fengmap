import React, { Component } from 'react'
import PropTypes from 'prop-types'

const EVENTS = [
  'focusGroupIDChanged',
  'loadComplete',
  'mapClickNode',
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
    mapOptions: PropTypes.object.isRequired,
    events: PropTypes.object,
    mapId: PropTypes.string,
    style: PropTypes.object,
    fengmapSDK: PropTypes.any.isRequired,
    loadingTxt: PropTypes.string,
    gestureEnableController: PropTypes.shape({
      enableMapPan: PropTypes.bool,
      enableMapPinch: PropTypes.bool,
      enableMapRotate: PropTypes.bool,
      enableMapIncline: PropTypes.bool
    })
  }

  static defaultProps = {
    loadingTxt: '地图加载中...'
  }

  constructor(props) {
    super(props)

    this.mapContainer = React.createRef()
    this.loadingTxt = React.createRef()
  }

  _loadMap = mapId => {
    const { mapOptions, events, fengmapSDK, gestureEnableController } = this.props
    if (!mapId || !fengmapSDK) {
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
        }
        if (events && events[e]) {
          events[e](event, this.mapInstance)
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

  componentDidMount() {
    this._loadMap(this.props.mapId)
    this.loadingTxt.current.style['zIndex'] = 10
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
    const { style, loadingTxt } = this.props
    return (
      <div style={Object.assign({}, style, { position: 'relative' })}>
        <div ref={this.mapContainer} style={INNER_STYLE} />
        <div ref={this.loadingTxt} style={INNER_STYLE}>
          {loadingTxt}
        </div>
      </div>
    )
  }
}

export default FengmapBase
