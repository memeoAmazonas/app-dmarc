import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import Grid from '@material-ui/core/Grid';

import { matrixFilterSelector, dateFilterSelector } from 'rdx/records/selectors';
import {
  domainDetailsFromRecordsSelector,
  domainDetailsFromPrecalculatedSelector,
} from 'rdx/summary/selectors';
import Chart from 'common/components/Chart';


const ChartRow = ({
  intl, matrixFilter, dateFilter,
  domainDetailsFromRecords, domainDetailsFromPrecalculated,
}) => {
  const commonLabels = [
    intl.formatMessage({ id: 'risk.dashboard.graph.aligned_authenticated' }),
    intl.formatMessage({ id: 'risk.dashboard.graph.aligned_unauthenticated' }),
    intl.formatMessage({ id: 'risk.dashboard.graph.not_aligned' }),
  ]

  const state = _.get(_.isNil(matrixFilter) && _.isNil(dateFilter)
    ? domainDetailsFromPrecalculated
    : domainDetailsFromRecords, 'alignment');

  const spf = _.get(state, 'spf')
  const dkim = _.get(state, 'dkim')

  const spfData = spf ? [
    spf.alignedAuthenticated,
    spf.alignedUnauthenticated,
    spf.notAligned,
  ] : []
  const dkimData = dkim ? [
    dkim.alignedAuthenticated,
    dkim.alignedUnauthenticated,
    dkim.notAligned,
  ] : []
  return (
    <Grid container spacing={2}>
      <Grid item md={6} sm={12}>
        <Chart
          variant="doughnut"
          data={spfData}
          extraLabel={intl.formatNumber(_.get(spf, 'percentage', 0), { style: 'percent', maximumFractionDigits: 2 })}
          labels={commonLabels}
          headerKey="risk.dashboard.spf.graph.header"
        />
      </Grid>
      <Grid item md={6} sm={12}>
        <Chart
          variant="doughnut"
          data={dkimData}
          extraLabel={intl.formatNumber(_.get(dkim, 'percentage', 0), { style: 'percent', maximumFractionDigits: 2 })}
          labels={commonLabels}
          headerKey="risk.dashboard.dkim.graph.header"
        />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  matrixFilter: matrixFilterSelector(state),
  dateFilter: dateFilterSelector(state),
  domainDetailsFromRecords: domainDetailsFromRecordsSelector(state),
  domainDetailsFromPrecalculated: domainDetailsFromPrecalculatedSelector(state),
});

export default injectIntl(connect(mapStateToProps)(ChartRow));
