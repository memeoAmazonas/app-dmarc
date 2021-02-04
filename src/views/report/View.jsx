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
import { asyncActions, selectDisplay } from 'rdx/summary/actions';
import { withUserInfo } from 'common/components/Utilities/AuthProviders';
import TabPanel from 'common/components/TabPanel';
import { LABEL_REPORT_TABS } from 'common/constants/tabsTitles';
import TableDetail from 'views/report/TableDetail';
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import {
  KEY_DATE_REPORT_FILTER,
  KEY_DISPLAY_SELECTED,
  KEY_REPORT_DETAIL,
  KEY_REPORT_LOADING,
} from 'rdx/newRedux/selectores/keys';
import Action from 'rdx/newRedux/actions/Action';
import { DATE_REPORT_FILTER, GET_REPORT } from 'rdx/newRedux/types';
import dataApi from 'rdx/newRedux/api/dataApi';
import Container from 'common/components/FlexContainer/Container';
import SkeletoLoading from 'views/report/SkeletoLoading';
import Date from 'common/components/Date/Date';
import AsyncAction from 'rdx/newRedux/actions/AsyncAction';
import { parserRegister } from 'rdx/newRedux/parser/reports';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';
import Separator from 'common/components/Separator';
import { theme } from 'src/theme';

const View = ({
  customerId, loadPrecalculated, domainDetails, intl, domain, setDisplay,
}) => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = React.useState(0);
  const [byDate, setByDate] = React.useState(false);
  const detailsReports = GetSelector(KEY_REPORT_DETAIL);
  const loading = GetSelector(KEY_REPORT_LOADING);
  const selected = GetSelector(KEY_DISPLAY_SELECTED);
  const dates = GetSelector(KEY_DATE_REPORT_FILTER);

  const setDispatchByDomain = () => {
    setByDate(false);
    dispatch(AsyncAction(DATE_REPORT_FILTER, { init: null, end: null }));
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

  React.useEffect(() => {
    if (customerId && _.isEmpty(domainDetails)) loadPrecalculated({ customerId });
    Scroll.scrollTop()
  }, [customerId]);
  React.useEffect(() => {
    if (customerId) {
      setDispatchByDomain();
    }
  }, [domain, customerId]);
  const setDispatchByDate = (
    dateOrigin,
    dateEnd,
    pos = tabIndex + 1,
    parser = (data) => JSON.parse(data)
  ) => {
    const payload = {
      params: {
        id: customerId,
        dominio: domain,
        type: 100,
        pos,
        dateEnd,
        dateOrigin,
        lim: 100,
      },
      parser,
      ...dataApi.reportByDates,
    }
    dispatch(Action(GET_REPORT, payload));
  }
  const onGetByDate = (dateOrigin, dateEnd) => {
    if (!dates || dates.init !== dateOrigin || dates.end !== dateEnd) {
      setDisplay(-1);
      setByDate(true);
      dispatch(AsyncAction(DATE_REPORT_FILTER, { init: dateOrigin, end: dateEnd }));
      setDispatchByDate(dateOrigin, dateEnd,);
    }
  }
  const onChangeTab = (val) => {
    const exist = get(detailsReports, `pos${val + 1}`);
    if (byDate === true && !exist) {
      const { init, end } = dates;
      setDispatchByDate(init, end, val + 1, (data) => parserRegister(detailsReports, data));
    }
    setTabIndex(val);
  }
  const details = detailsReports
    && ((!byDate && get(get(detailsReports, `type${selected}`), `pos${tabIndex + 1}`))
      || (byDate && get(detailsReports, `pos${tabIndex + 1}`)));
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          <Font variant="h1" component="span" style={{ fontSize: 40, color: theme.colors.blue1 }}>
            <b><FormattedMessage id="menu.report360" /></b>
          </Font>
          <Separator />
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FilterToggle
                ready
                showLink
                onClick={() => {
                }}
                onReset={byDate ? setDispatchByDomain : null}
              />
              <RangeSelector onSelect={byDate ? setDispatchByDomain : null} />
            </Grid>
            <Grid item xs={12}>
              <Domains type="report-360" />
            </Grid>
            <Grid item xs={12}>
              <Date onSearch={(a, b) => onGetByDate(a, b)} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8} xs={12}>
          {loading === false
          && (
            <Container marginTop={64}>
              <TabPanel titles={LABEL_REPORT_TABS} tabIndex={tabIndex} setTabIndex={onChangeTab} />
              <Container marginTop={25}>
                <Container>
                  <TableDetail intl={intl} details={details} />
                </Container>
              </Container>
            </Container>
          )
          }
          {(loading === true || loading === undefined) && <SkeletoLoading />}
        </Grid>

      </Grid>
    </Layout>
  );
};

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
