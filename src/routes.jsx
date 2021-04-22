import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dasboard from 'views/dashboard';
import RiskMatrix from 'views/riskmatrix';
import Report360 from 'views/reports/360';
import ReportForensic from 'views/reports/forensic';

module.exports = (
  <div>
    <div>
      <Switch>
        <Route exact path="/" component={Dasboard} />
        <Route exact path="/dashboard" component={Dasboard} />
        <Route exact path="/riskmatrix" component={RiskMatrix} />
        <Route exact path="/report-360" component={Report360} />
        <Route exact path="/report-forensic" component={ReportForensic} />
        <Route path="*" component={Dasboard} />
      </Switch>
    </div>
  </div>
)
