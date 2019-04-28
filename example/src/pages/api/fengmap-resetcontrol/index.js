import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapResetControl } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { resolvePublicPath } from '../../../helpers/env'

class FengmapResetControlDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  render() {
    const { screenWidth } = this.props
    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth
    return (
      <React.Fragment>
        <Highlight language="jsx">
          {`// 基础地图
<FengmapBase mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapResetControl ctrlOptions={CtrlOptions} />
</FengmapBase>

// 带楼层控制的地图
<FengmapFloors mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapResetControl ctrlOptions={CtrlOptions} />
</FengmapFloors>
`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'ctrlOptions',
              type: 'Object',
              description: <React.Fragment />
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
              height: '750px'
            }}
          >
            <FengmapResetControl
              ctrlOptions={{
                position: 'LEFT_TOP',
                imgURL: resolvePublicPath('/assets/reset.png')
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
    <FengmapResetControl
    ctrlOptions={{
      position: 'LEFT_TOP',//控件位置：可选LEFT_TOP，RIGHT_TOP，LEFT_BOTTOM，RIGHT_BOTTOM；默认LEFT_TOP
      imgURL: resolvePublicPath('/assets/')//非必传，默认为默认图标
    }}
  />
    </FengmapFloors>
  )
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapResetControlDoc)
