import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import { getRouteDefinition } from '../../helpers/view'
import throttle from 'lodash/throttle'

export default function withAPIDoc(APIDoc) {
  class Wrapper extends Component {
    static propTypes = {
      location: PropTypes.object.isRequired
    }

    constructor(props) {
      super(props)

      this.state = {
        screenWidth: 0
      }

      this._resizeHandler = throttle(this._resizeHandler, 200)
    }

    _resizeHandler = () => {
      const width = document.body.clientWidth
      this.setState({
        screenWidth: width
      })
    }

    componentDidMount() {
      window.addEventListener('resize', this._resizeHandler, false)

      this._resizeHandler()
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this._resizeHandler)
    }

    render() {
      const { location } = this.props
      const definition = getRouteDefinition(location.pathname)
      if (!definition) {
        return <div>路径是不是不对啊？</div>
      }

      return (
        <div>
          <h1>{definition.displayTitle}</h1>
          <p>{definition.description}</p>

          <APIDoc screenWidth={this.state.screenWidth} />
        </div>
      )
    }
  }

  return withRouter(Wrapper)
}
