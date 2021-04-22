import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { withRouter } from 'react-router-dom'
import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';
import Font from 'common/components/Font';
import { theme } from 'src/theme';
import { FormattedMessage } from 'react-intl';
import Separator from 'common/components/Separator';
import Domains from 'views/riskmatrix/Domains';
import { asyncActions, selectDisplay } from 'rdx/summary/actions';
import { currentDomainSelector, domainDetailsSelector } from 'rdx/summary/selectors';
import { connect, useDispatch } from 'react-redux';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import Container from 'common/components/FlexContainer/Container';
import SkeletoLoading from 'common/components/Skeleton/SkeletoLoading';
import Details from 'views/reports/histogram/Details';
import { Scroll } from 'common/utils/services/scroll.service';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_REPORT_DETAIL_HISTOGRAM } from 'rdx/newRedux/selectores/keys';
import dataApi from 'rdx/newRedux/api/dataApi';
import Action from 'rdx/newRedux/actions/Action';
import { GET_HISTOGRAM } from 'rdx/newRedux/types';
import { parserHistogram } from 'rdx/newRedux/parser/reports';
import RadioButtonList from 'common/components/RadioButtonList/RadioButtonList';
import { RADIO_SELECTED_RANGE } from 'common/constants/radioButtonItems';

const View = ({
  customerId, loadPrecalculated, domainDetails, domain,

}) => {
  const reports = GetSelector(KEY_REPORT_DETAIL_HISTOGRAM);
  const dispatch = useDispatch()
  React.useEffect(() => {
    if (customerId) {
      const payload = {
        params: {
          id: customerId,
          dominio: domain,
        },
        ...dataApi.reportHistogram,
      }
      dispatch(Action(GET_HISTOGRAM, payload));
    }
  }, [customerId, domain]);

  React.useEffect(() => {
    if (customerId && isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  const [range, setRange] = React.useState('7');
  const data = reports ? parserHistogram(reports).map((item) => (
    <Details range={range} key={item.label} label={item.label} details={item.data} />)) : null
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Font variant="h1" component="span" style={{ fontSize: 40, color: theme.colors.blue1 }}>
            <b><FormattedMessage id="menu.reports.histogram" /></b>
          </Font>
          <Separator />

          <Grid item xs={12}>
            <Domains type="histogram" />
          </Grid>
          <Grid item xs={12}>
            <RadioButtonList
              title="histogram.values"
              details={RADIO_SELECTED_RANGE}
              onSelected={(e) => setRange(e.target.value)}
              selected={range}
            />
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          {reports
            ? (
              <Container marginTop={65}>
                {data}
              </Container>
            )
            : <SkeletoLoading />
          }
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
