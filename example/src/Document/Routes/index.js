import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import components from './Components'

export class Routes extends Component {
  render() {
    return (
      <Switch>
        {components.map(c => {
          return <Route key={c.url} exact path={c.url} component={c.component} />
        })}
        <Redirect to="/fengmap-base" />
      </Switch>
    )
  }
}

export const RawRoutes = [...components]
