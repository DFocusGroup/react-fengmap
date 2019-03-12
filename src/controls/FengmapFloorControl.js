import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

import HorizontalButtonGroupsControl from '../components/HorizontalButtonGroupsControl'

class FengmapFloorControl extends FengmapBaseControl {
  static propTypes = {
    ctrlOptions: PropTypes.shape({
      allLayer: PropTypes.bool,
      showBtnCount: PropTypes.number,
      position: PropTypes.number,
      offset: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      }),
      imgURL: PropTypes.string
    }).isRequired,
    onFloorChange: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      showHorizontal: false,
      ctrlOptions: null,
      map: null,
      fengmapSDK: null
    }
  }

  load = (map, fengmapSDK, parent) => {
    const { ctrlOptions } = this.props
    if (!parent.isFengmapBase) {
      throw new Error('<FengmapFloorControl /> cannot work with <FengmapFloors />')
    }
    if (map.height < 550) {
      return this.setState({
        showHorizontal: true,
        ctrlOptions,
        map,
        fengmapSDK
      })
    }

    const control = new fengmapSDK.buttonGroupsControl(map, ctrlOptions)

    control.onChange((groups, allLayer) => {
      const { onFloorChange } = this.props
      if (!onFloorChange) {
        return
      }
      onFloorChange({
        floorLevel: map.focusFloor,
        groupId: map.focusGroupID
      })
    })
  }

  render() {
    const { showHorizontal, ctrlOptions, map, fengmapSDK } = this.state
    return (
      showHorizontal && (
        <HorizontalButtonGroupsControl ctrlOptions={ctrlOptions || {}} height={map.height} sdk={fengmapSDK} map={map} />
      )
    )
  }
}

export default FengmapFloorControl
