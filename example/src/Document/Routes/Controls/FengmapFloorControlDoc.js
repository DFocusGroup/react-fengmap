import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { default as SyntaxHighlighter } from 'react-syntax-highlighter/dist/esm/prism'
import { darcula } from 'react-syntax-highlighter/dist/styles/prism'

import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapFloorControl } from 'react-fengmap'

import PropsDoc from '../../../Components/PropsDoc'
import withAPIDoc from '../../../Components/APIDoc'

class FengmapFloorControlDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  changeFloor = e => {
    console.log('e', e)
  }

  render() {
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth
    return (
      <React.Fragment>
        <SyntaxHighlighter language="jsx" style={darcula}>
          {`// 只能配合基础地图
<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapFloorControl ctrlOptions={CtrlOptions} onFloorChange={OnFloorChange} />
</FengmapBase>
`}
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
                    href="https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.buttonGroupsControl.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ctrlOpts
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'onFloorChange',
              type: 'Function',
              description: '楼层切换时的回调函数'
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
              mapServerURL: process.env.PUBLIC_URL + '/maps/10347',
              mapThemeURL: process.env.PUBLIC_URL + '/maps/theme',
              defaultMapScaleLevel: 20,
              defaultTiltAngle: 45
            }}
            gestureEnableController={{
              enableMapPinch: false
            }}
            style={{
              width: `${contentWidth}px`,
              height: '550px'
            }}
          >
            <FengmapFloorControl
              ctrlOptions={{
                position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
                showBtnCount: 7
              }}
              onFloorChange={this.changeFloor}
            />
          </FengmapBase>

          <br />

          <SyntaxHighlighter language="jsx" style={darcula}>
            {`import fengmapSDK from 'fengmap'
            
export default function Example(props) {
  return (
    <FengmapBase
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
      style={{
        width: '100%',
        height: '550px'
      }}
    >
      <FengmapFloorControl
        ctrlOptions={{
          position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
          showBtnCount: 7
        }}
        onFloorChange={this.changeFloor}
      />
    </FengmapBase>
  )
}
`}
          </SyntaxHighlighter>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapFloorControlDoc)
