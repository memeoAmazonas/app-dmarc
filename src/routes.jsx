import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dasboard from 'views/dashboard';
import RiskMatrix from 'views/riskmatrix';


module.exports = (
  <div>
    <div>
      <Switch>
        <Route exact path="/" component={Dasboard} />
        <Route exact path="/dashboard" component={Dasboard} />
        <Route exact path="/riskmatrix" component={RiskMatrix} />
        <Route path="*" component={Dasboard} />
      </Switch>
    </div>
  </div>
)
