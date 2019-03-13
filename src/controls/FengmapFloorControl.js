import React from 'react'
import FengmapBaseControl from '../bases/FengmapBaseControl'
import PropTypes from 'prop-types'

import HorizontalButtonGroupsControl from '../components/HorizontalButtonGroupsControl'
import VerticalButtonGroupsControl from '../components/VerticalButtonGroupsControl'

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

    this.resizeHandler = () => {
      setTimeout(() => {
        this.setState({
          showHorizontal: map.height < 450
        })
      }, 1000)
    }

    window.addEventListener('resize', this.resizeHandler)

    this.setState({
      ctrlOptions,
      map,
      fengmapSDK
    })

    setTimeout(this.resizeHandler, 500)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    const { showHorizontal, ctrlOptions, map, fengmapSDK } = this.state

    if (!map) {
      return null
    }
    const ButtonGroupsControl = showHorizontal ? HorizontalButtonGroupsControl : VerticalButtonGroupsControl
    return <ButtonGroupsControl ctrlOptions={ctrlOptions || {}} height={map.height} sdk={fengmapSDK} map={map} />
  }
}

export default FengmapFloorControl
