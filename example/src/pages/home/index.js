import React from 'react'
import { Row, Col } from 'antd'
import Highlight from '../../Components/Highlight'
import CodeSnippet from '../../Components/CodeSnippet'

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row justify="center" type="flex" align="middle" style={{ marginTop: '10px' }}>
          <Col xxl={18} xl={18} lg={22} xs={23}>
            <div id="github" style={{ display: 'flex' }}>
              <span>热烈欢迎您的star &nbsp;&nbsp;</span>
              <iframe
                title="star"
                src="https://ghbtns.com/github-btn.html?user=DFocusGroup&repo=react-fengmap&type=star&count=true"
                frameBorder="0"
                width="100"
                height="20"
              />
              <iframe
                title="fork"
                src="https://ghbtns.com/github-btn.html?user=DFocusGroup&repo=react-fengmap&type=fork&count=true"
                frameBorder="0"
                width="100"
                height="20"
              />
            </div>
            <br />
            <h1>关于</h1>
            <p>
              这是一个对
              <a href="https://www.fengmap.com/">蜂鸟地图</a>
              标准SDK的<code>react</code>封装。如果您也在使用
              <a href="https://reactjs.org/">React</a>和<a href="https://www.fengmap.com/">蜂鸟地图</a>，
              ，欢迎使用我们的封装组件，并且加入到我们的维护大军中！
            </p>
            <p>是时候来一发炸裂的开场了！！！！</p>
            <h1>安装</h1>
            <Highlight language="bash">{`npm install fengmap react-fengmap`}</Highlight>
            <h1>引入</h1>
            <Highlight language="jsx">{`import { FengmapBase } from 'react-fengmap'`}</Highlight>
            <h1>使用</h1>
            <Highlight language="jsx">
              {`// 日期区间选择器
import React from 'react'
import fengmapSDK from 'fengmap'
import { FengmapBase } from 'react-fengmap'

class Example extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mapId: '10347',
      mapOptions: {
        key: '你的key',
        //开发者申请应用名称
        appName: '你的应用',
        defaultMapScaleLevel: 20,
        defaultTiltAngle: 45
      }
    }
  }

  render() {
    const { mapId, mapOptions } = this.props
    return (
      <FengmapBase
        fengmapSDK={fengmapSDK}
        mapId={mapId}
        mapOptions={mapOptions}
        style={{
          width: '800px',
          height: '550px'
        }}
      />
    )
  }
}`}
            </Highlight>

            <h1>注</h1>
            <p>
              通过<CodeSnippet>loadComplete</CodeSnippet>
              事件得到的原始蜂鸟地图的<CodeSnippet>mapInstance</CodeSnippet>里，会多两个属性：
              <CodeSnippet>focusFloor</CodeSnippet>、<CodeSnippet>listFloors</CodeSnippet>。
            </p>
            <p>
              <CodeSnippet>focusFloor</CodeSnippet>: 当前聚焦的楼层
            </p>
            <p>
              <CodeSnippet>listFloors</CodeSnippet>: 所有楼层数据，类型为Array
            </p>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Home
