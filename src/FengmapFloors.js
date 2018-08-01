import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FengmapBase from './FengmapBase'
import { isNil } from './helpers/object'

class FengmapFloors extends Component {
  static propTypes = {
    mapOptions: PropTypes.object,
    events: PropTypes.object,
    floors: PropTypes.shape({
      availableValues: PropTypes.arrayOf(PropTypes.number),
      value: PropTypes.number
    }),
    onFloorChange: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.mapInstance = null
  }

  componentDidUpdate(prevProps) {
    if (!this.props.floors) {
      return
    }
    if (prevProps.floors && this.props.floors.value === prevProps.floors.value) {
      return
    }
    if (!this.mapInstance) {
      return
    }

    this._changeFloor()
  }

  _changeFloor = () => {
    const { floors, onFloorChange } = this.props
    if (isNil(floors) || !this.mapInstance) {
      return
    }
    const index = floors.availableValues.findIndex(f => f === floors.value)
    const groupId = index + 1
    this.mapInstance.visibleGroupIDs = [groupId]
    this.mapInstance.focusGroupID = groupId

    if (onFloorChange) {
      onFloorChange({
        floorLevel: floors.value,
        groupId
      })
    }
  }

  render() {
    const props = omit(this.props, 'events', 'mapOptions')
    const events = omit(this.props.events || {}, 'loadComplete')
    const mapOptions = this.props.mapOptions
    return (
      <FengmapBase
        {...props}
        mapOptions={Object.assign({}, mapOptions, { defaultVisibleGroups: [], defaultFocusGroup: null })}
        events={{
          ...events,
          loadComplete: (e, map) => {
            this.mapInstance = map
            if (this.props.events && this.props.events.loadComplete) {
              this.props.events.loadComplete(e, map)
            }
            this._changeFloor()
          }
        }}
      />
    )
  }
}

export default FengmapFloors

function omit(obj, ...keys) {
  const newObj = {}
  Object.keys(obj)
    .filter(k => keys.indexOf(k) < 0)
    .forEach(k => {
      newObj[k] = obj[k]
    })
  return newObj
}
