import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapImageMarker } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { resolvePublicPath } from '../../../helpers/env'

class FengmapImageMarkerDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.state = {
      markerPos: null
    }
  }

  render() {
    const { markerPos } = this.state
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth
    return (
      <React.Fragment>
        <Highlight language="jsx">
          {`<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapImageMarker opts={Opts} />
</FengmapBase>
`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'opts',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.FMImageMarker.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    opts
                  </a>
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>

          <FengmapBase
            fengmapSDK={fengmapSDK}
            mapId="10347"
            mapOptions={{
              key: 'e843c6307e42ec8de24d14a10e07ca20',
              //开发者申请应用名称
              appName: 'github演示应用',
              mapServerURL: resolvePublicPath('/maps/10347'),
              mapThemeURL: resolvePublicPath('/maps/theme'),
              defaultMapScaleLevel: 20
            }}
            gestureEnableController={{
              enableMapPinch: false
            }}
            style={{
              width: `${contentWidth}px`,
              height: '550px'
            }}
            events={{
              mapClickNode: e => {
                this.setState({
                  markerPos: {
                    x: e.x,
                    y: e.y
                  }
                })
              }
            }}
          >
            <FengmapImageMarker
              opts={{
                ...(markerPos || {}),
                size: 50,
                height: 10,
                url: resolvePublicPath('/assets/marker.png')
              }}
            />
          </FengmapBase>

          <br />

          <Highlight language="jsx">
            {`import fengmapSDK from 'fengmap'
import { FengmapBase, Fengmap3DControl } from 'react-fengmap'
            
export default function Example(props) {
  return (
    <FengmapBase
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        key: 'e843c6307e42ec8de24d14a10e07ca20',
        //开发者申请应用名称
        appName: 'github演示应用',
        mapServerURL: '/maps/10347',
        mapThemeURL: '/maps/theme',
        defaultMapScaleLevel: 20
      }}
      gestureEnableController={{
        enableMapPinch: false
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
    >
      <FengmapImageMarker
        opts={{
          x: props.x,
          y: props.y,
          size: 50,
          height: 0,
          url: '/assets/marker.png'
        }}
      />
    </FengmapBase>
  )
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapImageMarkerDoc)
