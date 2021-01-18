import React from 'react';
import _ from 'lodash';

import { injectIntl } from 'react-intl'
import Info from 'common/components/Info';
import Grid from '@material-ui/core/Grid';

import FlexContainer from 'common/components/FlexContainer';
import DomainCount from './DomainCount';


const Summary = ({ intl, summary = Object(), amount = 0 }) => {
  const getPercentage = (state, status) => {
    if (!_.isEmpty(summary)) {
      return intl.formatNumber(summary.getPercentage(state, status), { style: 'percent', maximumFractionDigits: 2 });
    }
    return '';
  }

  return (
    <FlexContainer container spacing={2}>
      <Grid item md={3} xs={12}>
        <DomainCount amount={amount} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Info
          header={intl.formatMessage({ id: 'dashboard.details.summary' })}
          labels={[
            intl.formatMessage({ id: 'dashboard.summary.messagesTotal' }),
            intl.formatMessage({ id: 'dashboard.summary.dmarcPass' }),
            intl.formatMessage({ id: 'dashboard.summary.dmarcPassPerc' }),
          ]}
          data={[
            _.get(summary, 'states.totalMessages'),
            _.get(summary, 'states.dmarc.pass'),
            getPercentage('dmarc', 'pass'),
          ]}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <Info
          header={intl.formatMessage({ id: 'dashboard.summary.info.header.auth' })}
          labels={[
            intl.formatMessage({ id: 'dashboard.summary.authMessages' }),
            intl.formatMessage({ id: 'dashboard.summary.authMessagesPerc' }),
          ]}
          data={[
            _.get(summary, 'states.authorized.pass'),
            getPercentage('authorized', 'pass'),
          ]}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <Info
          header={intl.formatMessage({ id: 'dashboard.summary.info.header.authenticated' })}
          labels={[
            intl.formatMessage({ id: 'dashboard.summary.authenticatedMessages' }),
            intl.formatMessage({ id: 'dashboard.summary.authenticatedMessagesPerc' }),
          ]}
          data={[
            _.get(summary, 'states.authenticated.pass'),
            getPercentage('authenticated', 'pass'),
          ]}
        />
      </Grid>
    </FlexContainer>
  )
}

export default injectIntl(Summary);
