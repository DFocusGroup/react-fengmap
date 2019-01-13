import React, { Component } from 'react'
import PropTypes from 'prop-types'
import fengmapSDK from 'fengmap'
import { FengmapBase } from 'react-fengmap'

import Highlight from '../../../Components/Highlight'
import withAPIDoc from '../../../Components/APIDoc'
import PropsDoc from '../../../Components/PropsDoc'
import CodeSnippet from '../../../Components/CodeSnippet'
import { resolvePublicPath } from '../../../helpers/env'

class FengmapBaseDoc extends Component {
  static propTypes = {
    screenWidth: PropTypes.number
  }

  render() {
    const { screenWidth } = this.props

    const contentWidth = screenWidth > 1000 ? screenWidth - 280 - 24 * 4 - 40 : screenWidth

    return (
      <React.Fragment>
        <Highlight language="jsx">
          {`<FengmapBase 
  mapId={MapId}
  style={Style}
  fengmapSDK={SDK}
  loadingTxt={LoadingText}
  mapOptions={MapOptions}
  events={Events}
/>`}
        </Highlight>

        <br />

        <PropsDoc
          data={[
            {
              prop: 'mapId',
              type: 'String',
              description: '用来指定要打开哪个室内地图'
            },
            {
              prop: 'style',
              type: 'Object',
              description: '指定地图容器样式'
            },
            {
              prop: 'fengmapSDK',
              type: 'Object',
              description: '指定蜂鸟地图SDK'
            },
            {
              prop: 'loadingTxt',
              type: 'String',
              description: '指定蜂鸟地图未加载完毕前的显示文字'
            },
            {
              prop: 'supportTxt',
              type: 'String',
              description:
                '指定蜂鸟地图在系统不支持时的提示文字，默认为：您使用的浏览器暂不支持地图，请升级或改用Chrome获取更好的服务'
            },
            {
              prop: 'mapOptions',
              type: 'Object',
              description: (
                <React.Fragment>
                  请参考
                  <a
                    href="https://www.fengmap.com/docs/js/v2.2.0_beta/classes/fengmap.MapOptions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    fengmap.MapOptions
                  </a>
                </React.Fragment>
              )
            },
            {
              prop: 'events',
              type: 'Object',
              description: (
                <React.Fragment>
                  键值组合，key的可用值： [
                  {[
                    'focusGroupIDChanged',
                    'loadComplete',
                    'mapClickNode',
                    'mapHoverNode',
                    'mapScaleLevelChanged',
                    'scaleLevelChanged',
                    'visibleGroupIDsChanged'
                  ].map((e, i) => {
                    return (
                      <span key={i}>
                        <CodeSnippet>{e}</CodeSnippet>
                        {i !== 6 ? ',' : ''}
                      </span>
                    )
                  })}
                  ]，value是事件响应函数
                </React.Fragment>
              )
            },
            {
              prop: 'gestureEnableController',
              type: 'Object',
              description: (
                <React.Fragment>
                  键值组合，key的可用值： [
                  {[
                    'enableMapHover',
                    'enableMapPan',
                    'enableMapPinch',
                    'enableMapRotate',
                    'enableMapIncline',
                    'enableMapSingleTap'
                  ].map((e, i) => {
                    return (
                      <span key={i}>
                        <CodeSnippet>{e}</CodeSnippet>
                        {i !== 5 ? ',' : ''}
                      </span>
                    )
                  })}
                  ]，
                  <CodeSnippet>value</CodeSnippet>
                  是各状态的
                  <CodeSnippet>boolean</CodeSnippet>
                  值。 各<CodeSnippet>key</CodeSnippet>
                  依次表示'设置能否悬停(PC)', '设置能否移动模型', '设置能否缩放', '设置能否旋转模型',
                  '设置能否倾斜模型', '设置能否拾取'
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
              defaultMapScaleLevel: 20,
              defaultTiltAngle: 45
            }}
            events={{
              loadComplete(e, map) {
                console.log('地图加载完毕', map)
              },
              mapClickNode(e, map) {
                alert(`你点击的FID是： [${e.FID}]`)
              }
            }}
            gestureEnableController={{
              enableMapPinch: true
            }}
            style={{
              width: `${contentWidth}px`,
              height: '550px'
            }}
            supportTxt="fuck"
          />

          <br />

          <Highlight language="jsx">
            {`import fengmapSDK from 'fengmap'
import { FengmapBase } from 'react-fengmap'
            
export default function Example() {
  return (
    <FengmapBase
      fengmapSDK={fengmapSDK}
      mapId="10347"
      mapOptions={{
        //开发者申请应用名称
        appName: '应用名',
        key: 'appkey',
        mapServerURL: '/maps/10347',
        mapThemeURL: '/maps/theme',
        defaultMapScaleLevel: 20,
        defaultTiltAngle: 45
      }}
      events={{
        loadComplete(e, map) {
          console.log('地图加载完毕')
        },
        mapClickNode(e, map) {
          alert(\`你点击的FID是： [\${e.FID}]\`)
        }
      }}
      gestureEnableController={{
        enableMapPinch: true // 允许鼠标滚轮或者手势pinch缩放地图
      }}
      style={{
        width: '100%',
        height: '550px'
      }}
    />
  )
}
`}
          </Highlight>
        </div>
      </React.Fragment>
    )
  }
}

export default withAPIDoc(FengmapBaseDoc)
