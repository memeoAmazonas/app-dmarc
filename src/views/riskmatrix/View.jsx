import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';

import { asyncActions } from 'rdx/summary/actions'
import { currentDomainSelector, domainDetailsSelector } from 'rdx/summary/selectors';
import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';

import { Scroll } from 'common/utils/services/scroll.service'
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import { RangeSelector } from 'common/components/RangeSelector';
import Tools from 'views/riskmatrix/tool/Tools';
import ChartRow from './ChartRow';
import FilterToggle from './FilterToggle';
import Matrix from './Matrix';
import DomainHeader from './DomainHeader'
import Domains from './Domains';
import InfoRow from './InfoRow';
import Details from './Details';
import Dates from './Dates';


const MatrixDashboard = ({
  customerId, domain, loadPrecalculated, domainDetails,
}) => {
  React.useEffect(() => {
    if (customerId && isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid item md={4} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FilterToggle
                ready
                showLink
                onClick={() => {}}
              />
              <RangeSelector />
            </Grid>
            <Grid item xs={12}>
              <Domains />
            </Grid>
            {/*            <Grid item xs={12}>
              <Dates />
            </Grid> */}
            <Grid item xs={12}>
              <Tools />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid item xs={12}>
            <DomainHeader domain={domain} />
          </Grid>
          <InfoRow
            authenticated={get(domainDetails, 'totalAuthenticated', {})}
            dmarc={get(domainDetails, 'dmarc', {})}
            totalMessages={get(domainDetails, 'totalMessages')}
          />
          <ChartRow />
          <Matrix
            state={get(domainDetails, 'matrixState')}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Details />
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

const mapDispatchToProps = {
  loadPrecalculated: asyncActions.loadAction,
}
const mapStateToProps = (state) => ({
  domain: currentDomainSelector(state),
  domainDetails: domainDetailsSelector(state),
})

export default connect(
  mapStateToProps, mapDispatchToProps
)(
  withUserInfo(MatrixDashboard)
);
