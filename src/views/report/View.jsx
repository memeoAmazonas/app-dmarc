import React from 'react';
import get from 'lodash/get';
import { withRouter } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';

import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';
import { RangeSelector } from 'common/components/RangeSelector';
import FilterToggle from 'views/riskmatrix/FilterToggle';
import Domains from 'views/riskmatrix/Domains';
import { currentDomainSelector, domainDetailsSelector } from 'rdx/summary/selectors';
import _ from 'lodash';
import { Scroll } from 'common/utils/services/scroll.service';
import { asyncActions } from 'rdx/summary/actions';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import TabPanel from 'common/components/TabPanel';
import { LABEL_REPORT_TABS } from 'common/constants/tabsTitles';
import TableDetail from 'views/report/TableDetail';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_DISPLAY_SELECTED, KEY_REPORT_DETAIL, KEY_REPORT_LOADING } from 'rdx/newRedux/selectores/keys';
import Action from 'rdx/newRedux/actions/Action';
import { GET_REPORT } from 'rdx/newRedux/types';
import dataApi from 'rdx/newRedux/api/dataApi';
import Container from 'common/components/FlexContainer/Container';
import SkeletoLoading from 'views/report/SkeletoLoading';
import Date from 'common/components/Date/Date';

const View = ({
  customerId, loadPrecalculated, domainDetails, intl, domain,
}) => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const detailsReports = GetSelector(KEY_REPORT_DETAIL);
  const loading = GetSelector(KEY_REPORT_LOADING);
  const selected = GetSelector(KEY_DISPLAY_SELECTED);
  React.useEffect(() => {
    if (customerId && _.isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  React.useEffect(() => {
    if (customerId) {
      const payload = {
        params: {
          id: customerId,
          dominio: domain,
          type: 0,
          pos: 0,
        },
        ...dataApi.report,
      }
      dispatch(Action(GET_REPORT, payload));
    }
  }, [domain, customerId]);
  const details = detailsReports && get(get(detailsReports, `type${selected}`), `pos${tabIndex + 1}`);
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
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
              <Domains type="report-360" />
            </Grid>
            <Grid item xs={12}>
              <Date onSearch={(a, b) => console.log(a, b)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          {loading === false
            && (
            <Container marginTop={48}>
              <TabPanel titles={LABEL_REPORT_TABS} tabIndex={tabIndex} setTabIndex={setTabIndex} />
              <Container marginTop={25}>
                <TableDetail intl={intl} details={details} />
              </Container>
            </Container>
            )
          }
          { (loading === true || loading === undefined) && <SkeletoLoading /> }
        </Grid>
      </Grid>
    </Layout>
  );
};

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
  withRouter(withUserInfo(View))
);
