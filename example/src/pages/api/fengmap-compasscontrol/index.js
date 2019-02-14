import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapCompassControl } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import { resolvePublicPath } from '../../../helpers/env'

class FengmapCompassControlDoc extends Component {
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
  <FengmapCompassControl visible={Visible} image={Image} onClick={OnClick} />
</FengmapBase>

// 带楼层控制的地图
<FengmapFloors mapId={MapId} style={Style} fengmapSDK={SDK} mapOptions={MapOptions} >
  <FengmapCompassControl visible={Visible} image={Image} onClick={OnClick} />
</FengmapFloors>
`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'visible',
              type: 'Boolean',
              description: '是否显示指北针控件'
            },
            {
              prop: 'image',
              type: '{bg: String, fg: String}',
              description: '指北针的前景、背景图片'
            },
            {
              prop: 'onClick',
              type: '(map: FMMap) => void',
              description: '点击指北针时的事件'
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
          >
            <FengmapCompassControl
              visible
              image={{
                bg: resolvePublicPath('/assets/compass_bg.png'),
                fg: resolvePublicPath('/assets/compass_fg.png')
              }}
              onClick={() => alert('Compass clicked')}
            />
          </FengmapBase>

          <br />

          <Highlight language="jsx">
            {`import fengmapSDK from 'fengmap'
import { FengmapBase, FengmapCompassControl } from 'react-fengmap'
            
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
      <FengmapCompassControl
        visible
        image={{
          bg: '/assets/compass_bg.png',
          fg: '/assets/compass_fg.png'
        }}
        onClick={() => alert('Compass clicked')}
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

export default withAPIDoc(FengmapCompassControlDoc)
