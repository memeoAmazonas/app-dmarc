import React from 'react';
import { withRouter } from 'react-router-dom'
import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';
import Font from 'common/components/Font';
import { theme } from 'src/theme';
import { FormattedMessage } from 'react-intl';
import Separator from 'common/components/Separator';
import FilterToggle from 'views/riskmatrix/FilterToggle';
import { RangeSelector } from 'common/components/RangeSelector';
import Domains from 'views/riskmatrix/Domains';
import { asyncActions, selectDisplay } from 'rdx/summary/actions';
import { currentDomainSelector, domainDetailsSelector } from 'rdx/summary/selectors';
import { connect } from 'react-redux';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import Container from 'common/components/FlexContainer/Container';
import SkeletoLoading from 'views/reports/SkeletoLoading';
import Details from 'views/reports/histogram/Details';
import { Scroll } from 'common/utils/services/scroll.service';

const View = ({
  customerId, loadPrecalculated, domainDetails, intl, domain,

}) => {
  const loading = false;
  /*  const dispatchByDomain = () => {
    const payload = {
      params: {
        id: customerId,
        dominio: domain,
      },
      ...dataApi.reportForensic,
    }
    dispatch(Action(GET_REPORT_FORENSIC, payload))
  }
  React.useEffect(() => {
    if (customerId && _.isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  React.useEffect(() => {
    if (customerId) {
      dispatchByDomain();
    }
  }, [domain, customerId]) */
  React.useEffect(() => {
    if (customerId && _.isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  /*  React.useEffect(() => {
    if (customerId) {
      dispatchByDomain();
    }
  }, [domain, customerId]) */

  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Font variant="h1" component="span" style={{ fontSize: 40, color: theme.colors.blue1 }}>
            <b><FormattedMessage id="menu.reports.histogram" /></b>
          </Font>
          <Separator />
          <Grid container spacing={1}>
            <FilterToggle
              ready
              showLink
              onClick={() => {
              }}
              onReset={() => null}
            />
          </Grid>
          <Grid item xs={12}>
            <RangeSelector />
          </Grid>
          <Grid item xs={12}>
            <Domains type="histogram" />
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          {loading === false
          && (
            <Container marginTop={64}>
              <Details />
            </Container>
          )}
          {(loading === true || loading === undefined) && <SkeletoLoading />}
        </Grid>
      </Grid>
    </Layout>
  );
}
const mapDispatchToProps = {
  loadPrecalculated: asyncActions.loadAction,
  setDisplay: selectDisplay,

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
