import React from 'react';
import _ from 'lodash';

import { injectIntl } from 'react-intl';
import Grid from '@material-ui/core/Grid';

import Info from 'common/components/Info';
import FlexContainer from 'common/components/FlexContainer';

const InfoRow = ({
  intl, totalMessages, authenticated,
  dmarc,
}) => {
  return (
    <FlexContainer container spacing={2} height="160px">
      <Grid item xs={12} md={3}>
        <Info
          header={
            intl.formatMessage({ id: 'dashboard.summary.messagesTotal' })
          }
          data={[totalMessages]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Info
          header={
            intl.formatMessage({ id: 'risk.dashboard.dmarc.pass' })
          }
          data={[dmarc.pass]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Info
          header={
            intl.formatMessage({ id: 'risk.dashboard.info.pass' })
          }
          data={[authenticated.pass]}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Info
          header={
            intl.formatMessage({ id: 'risk.dashboard.info.not_pass' })
          }
          data={[authenticated.fail]}
        />
      </Grid>
    </FlexContainer>
  )
}

export default injectIntl(InfoRow);