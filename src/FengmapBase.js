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

class FengmapBase extends Component {
  static propTypes = {
    mapOptions: PropTypes.object,
    events: PropTypes.object,
    mapId: PropTypes.string,
    style: PropTypes.object,
    fengmapSDK: PropTypes.any.isRequired
  }

  constructor(props) {
    super(props)

    this.mapContainer = React.createRef()
  }

  _loadMap = mapId => {
    const { mapOptions, events, fengmapSDK } = this.props
    if (!mapId || !fengmapSDK) {
      return
    }
    this.mapInstance = new fengmapSDK.FMMap(
      Object.assign(getMapOptions(mapId, mapOptions), { container: this.mapContainer.current })
    )

    EVENTS.forEach(e => {
      this.mapInstance.on(e, event => {
        if (events && events[e]) {
          events[e](event)
        }
      })
    })

    this.mapInstance.openMapById(mapId)
  }

  componentDidMount() {
    this._loadMap(this.props.mapId)
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
    const { style } = this.props
    return <div ref={this.mapContainer} style={style} />
  }
}

export default FengmapBase

const DEFAULT_OPTS = {
  defaultMapScaleLevel: 18
}

function getMapOptions(mapId, opts) {
  if (!opts) {
    return { ...DEFAULT_OPTS }
  }
  return Object.assign({}, DEFAULT_OPTS, opts)
}
