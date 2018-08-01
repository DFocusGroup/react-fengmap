import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import throttle from 'lodash/throttle'
import { Layout, Drawer } from 'antd'
import { RawRoutes } from '../Routes'

import './index.css'
import logoURL from '../../assets/logo.png'

export default class Navigation extends Component {
  constructor(props) {
    super(props)

    this._resizeHandler = throttle(this._resizeHandler.bind(this), 250)

    this.state = {
      screenWidth: 0,
      openSmallScreenMenu: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this._resizeHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeHandler)
  }

  _resizeHandler() {
    this.setState({
      screenWidth: window.innerWidth
    })
  }

  _toggleSmallScreenMenu = () => {
    if (this.state.screenWidth > 1000) {
      return
    }

    this.setState({
      openSmallScreenMenu: !this.state.openSmallScreenMenu
    })
  }

  render() {
    return (
      <Layout.Header className="header">
        <a href="https://github.com/DFocusFE/react-fengmap">
          <img
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              border: 0
            }}
            src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67"
            alt="Fork me on GitHub"
            data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
          />
        </a>
        <img src={logoURL} className="headerLogo" alt="" onClick={this._toggleSmallScreenMenu} />
        <span className="headerTitle">蜂鸟地图-react</span>
        <Drawer
          title="文档"
          placement="left"
          closable
          onClose={() =>
            this.setState({
              openSmallScreenMenu: false
            })
          }
          visible={this.state.openSmallScreenMenu}
        >
          {RawRoutes.map(c => {
            return (
              <div key={c.url} className="smallScreenMenuItem">
                <Link
                  to={c.url}
                  onClick={() =>
                    this.setState({
                      openSmallScreenMenu: false
                    })
                  }
                >
                  {c.displayTitle}
                </Link>
              </div>
            )
          })}
        </Drawer>
      </Layout.Header>
    )
  }
}
