import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { darcula } from 'react-syntax-highlighter/styles/prism'

import fengmapSDK from 'fengmap/build/fengmap.min-v2.1.23'
import { FengmapFloors, FengmapZoomControl } from 'react-fengmap'

import PropsDoc from '../../../Components/PropsDoc'
import { getRouteDefinition } from '../../../helpers/view'

class FengmapZoomControlDoc extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      selectedFloor: null
    }
  }

  changeFloor = e => {
    this.setState({
      selectedFloor: +e.target.value
    })
  }

  render() {
    const { location } = this.props
    const definition = getRouteDefinition(location.pathname)
    if (!definition) {
      return
    }

    return (
      <div>
        <h1>{definition.displayTitle}</h1>
        <p>{definition.description}</p>

        <h3>用法</h3>

        <SyntaxHighlighter language="jsx" style={darcula}>
          {`<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapZoomControl ctrlOptions={CtrlOptions} />
</FengmapBase>`}
        </SyntaxHighlighter>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'ctrlOptions',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.1.1_beta/classes/fengmap.zoomControl.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ctrlOpts
                  </a>
                </React.Fragment>
              )
            }
          ]}
        />

        <br />

        <div className="mapExample">
          <h3>示例</h3>

          <FengmapFloors
            fengmapSDK={fengmapSDK}
            mapId="10347"
            mapOptions={{
              key: 'e843c6307e42ec8de24d14a10e07ca20',
              //开发者申请应用名称
              appName: 'github演示应用',
              mapServerURL: process.env.PUBLIC_URL + '/maps/10347',
              mapThemeURL: process.env.PUBLIC_URL + '/maps/theme',
              defaultMapScaleLevel: 20,
              defaultTiltAngle: 45
            }}
            gestureEnableController={{
              enableMapPinch: false
            }}
            floors={{
              availableValues: [1, 2, 3, 4, 5, 6],
              value: 2
            }}
            style={{
              width: '100%',
              height: '550px'
            }}
          >
            <FengmapZoomControl
              ctrlOptions={{
                position: fengmapSDK.controlPositon.RIGHT_TOP,
                imgURL: process.env.PUBLIC_URL + '/assets/'
              }}
            />
          </FengmapFloors>

          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`import fengmapSDK from 'fengmap'
            
export default function Example(props) {
  return (
    <FengmapFloors
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        //开发者申请应用名称
        appName: '应用名',
        key: 'appkey',
        mapServerURL: '/maps/10347',
        defaultMapScaleLevel: 20,
        defaultTiltAngle: 45
      }}
      gestureEnableController={{
        enableMapPinch: false // 禁用鼠标滚轮或者手势pinch缩放地图
      }}
      floors={{
        availableValues: [1, 2, 3, 4, 5, 6],
        value: 2
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
    >
      <FengmapZoomControl ctrlOptions={{ position: fengmapSDK.controlPositon.RIGHT_TOP, imgURL: '/assets/' }} />
    </FengmapFloors>
  )
}
`}
          </SyntaxHighlighter>
        </div>
      </div>
    )
  }
}

export default withRouter(FengmapZoomControlDoc)
