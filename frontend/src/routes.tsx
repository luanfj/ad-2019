import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from './pages/Home'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/friend" />

      <Route path="/friend" component={Home} />
    </Switch>
  )
}

export default Routes
