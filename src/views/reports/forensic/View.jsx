import React from 'react';
import { withRouter } from 'react-router-dom'
import Layout from 'common/components/Layout';
import Grid from '@material-ui/core/Grid';
import Font from 'common/components/Font';
import { theme } from 'src/theme';
import { FormattedMessage } from 'react-intl';
import Separator from 'common/components/Separator';
import FilterToggle from 'views/riskmatrix/FilterToggle';
import RadioButtonList from 'common/components/RadioButtonList/RadioButtonList';
import { RADIO_ITEMS_REPORT_FORENSIC } from 'common/constants/radioButtonItems';
import { RangeSelector } from 'common/components/RangeSelector';
import Domains from 'views/riskmatrix/Domains';
import _ from 'lodash';
import { Scroll } from 'common/utils/services/scroll.service';
import { asyncActions, selectDisplay } from 'rdx/summary/actions';
import { currentDomainSelector, domainDetailsSelector } from 'rdx/summary/selectors';
import { connect } from 'react-redux';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import Container from 'common/components/FlexContainer/Container';
import TableDetail from 'views/reports/forensic/TableDetail';
import dataForense from 'assets/testData/forense';

const View = ({
  customerId, loadPrecalculated, domainDetails, intl, domain,

}) => {
  React.useEffect(() => {
    if (customerId && _.isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  const [group, setGroup] = React.useState('subject');
  const data = dataForense;
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Font variant="h1" component="span" style={{ fontSize: 40, color: theme.colors.blue1 }}>
            <b><FormattedMessage id="menu.reports.forensic" /></b>
          </Font>
          <Separator />
          <Grid container spacing={1}>
            <FilterToggle
              ready
              showLink
              onClick={() => {
              }}
              onReset={() => setGroup('0')}
            />
          </Grid>
          <Grid item xs={12}>
            <RadioButtonList
              title="radio.button.group.by"
              details={RADIO_ITEMS_REPORT_FORENSIC}
              onSelected={(e) => setGroup(e.target.value)}
              selected={group}
            />
          </Grid>
          <Grid item xs={12}>
            <RangeSelector />
          </Grid>
          <Grid item xs={12}>
            <Domains type="report-forensic" />
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          <Container marginTop={64}>
            <TableDetail data={data} type={group} intl={intl} />
          </Container>
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
