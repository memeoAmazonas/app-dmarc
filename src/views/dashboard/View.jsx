import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components'

import Grid from '@material-ui/core/Grid';

import { dashboardViewSelector } from 'rdx/summary/selectors';
import { asyncActions } from 'rdx/summary/actions';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';

import { Scroll } from 'common/utils/services/scroll.service'
import { RangeSelector } from 'common/components/RangeSelector';
import Chart from 'common/components/Chart';
import Layout from 'common/components/Layout'
import Separator from 'common/components/Separator';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
import Details from './Details';
import Summary from './Summary';

const RangeContainer = styled.div`
  margin-bottom: 10px;
`;


const Dashboard = ({
  customerId, domains, total, intl, loadPrecalculated,
}) => {
  const format = intl.formatMessage;

  useEffect(() => {
    if (customerId) {
      loadPrecalculated({ customerId });
    }
    Scroll.scrollTop()
  }, [customerId]);
  const getPercentage = (state, status) => {
    if (!_.isEmpty(total)) {
      return intl.formatNumber(total.getPercentage(state, status), { style: 'percent', maximumFractionDigits: 2 });
    }
    return '';
  }
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <RangeContainer>
            <RangeSelector />
          </RangeContainer>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Chart
            variant="doughnut"
            data={[
              _.get(total.authorized, 'pass', 0),
               _.get(total.authorized, 'fail', 0),
            ]}
            extraLabel={getPercentage('authorized', 'pass')}
            labels={[
              format({ id: 'dashboard.charts.authorized' }),
              format({ id: 'dashboard.charts.unauthorized' }),
            ]}
            headerKey="dasboard.chart1.header"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Chart
            variant="doughnut"
            data={[
              _.get(total.authenticated, 'pass', 0),
              _.get(total.authenticated, 'fail', 0),
            ]}
            extraLabel={getPercentage('authenticated', 'pass')}
            labels={[
              format({ id: 'dashboard.charts.authenticated' }),
              format({ id: 'dashboard.charts.unauthenticated' }),
            ]}
            headerKey="dasboard.chart2.header"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Chart
            variant="horizontal"
            data={[
              _.get(total.dmarc, 'pass'),
              _.get(total.dmarc, 'fail'),
            ]}
            labels={[
              format({ id: 'dashboard.charts.pass' }),
              format({ id: 'dashboard.charts.fail' }),
            ]}
            headerKey="dasboard.chart3.header"
          />
        </Grid>
        <Separator />
        <Summary summary={total} amount={Object.keys(domains || {}).length} />
        <Grid container>
          <Grid item md={12} xs={12}>
            <Details details={domains} />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

const mapDispatchToProps = {
  loadPrecalculated: asyncActions.loadAction,
}
const mapStateToProps = (state) => dashboardViewSelector(state)
export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withUserInfo(Dashboard)));
