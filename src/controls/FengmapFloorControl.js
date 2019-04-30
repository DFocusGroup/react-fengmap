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
      })
    }).isRequired,
    labelFormater: PropTypes.func
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
      this.resizeTimer = setTimeout(() => {
        try {
          this.setState({
            showHorizontal: map.height < 450
          })
        } catch (error) {
          console.warn(error.message)
        }
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

  unload = (map, fengmapSDK, parent) => {
    clearTimeout(this.resizeTimer)
    window.removeEventListener('resize', this.resizeHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  render() {
    const { labelFormater } = this.props
    const { showHorizontal, ctrlOptions, map, fengmapSDK } = this.state

    if (!map) {
      return null
    }
    const ButtonGroupsControl = showHorizontal ? HorizontalButtonGroupsControl : VerticalButtonGroupsControl
    return (
      <ButtonGroupsControl
        ctrlOptions={ctrlOptions || {}}
        height={map.height}
        sdk={fengmapSDK}
        map={map}
        labelFormater={labelFormater}
      />
    )
  }
}

export default FengmapFloorControl
