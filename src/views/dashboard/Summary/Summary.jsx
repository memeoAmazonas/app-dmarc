import React from 'react';
import _ from 'lodash';

import { injectIntl } from 'react-intl'
import Info from 'common/components/Info';
import Grid from '@material-ui/core/Grid';

import FlexContainer from 'common/components/FlexContainer';
import { FormatNumberESService } from 'common/utils/services/formatNumberES.service';
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
            FormatNumberESService.formatNumber(intl, _.get(summary, 'states.totalMessages', 0)),
            FormatNumberESService.formatNumber(intl, (_.get(summary, 'states.dmarc.pass', 0))),
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
            FormatNumberESService.formatNumber(intl, _.get(summary, 'states.authorized.pass', 0)),
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
            FormatNumberESService.formatNumber(intl, _.get(summary, 'states.authenticated.pass', 0)),
            getPercentage('authenticated', 'pass'),
          ]}
        />
      </Grid>
    </FlexContainer>
  )
}

export default injectIntl(Summary);
