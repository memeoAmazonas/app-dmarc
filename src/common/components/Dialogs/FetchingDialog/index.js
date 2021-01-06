import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { fetchingDataSelector } from 'rdx/dialogs/selectors';
import { FormattedMessage } from 'react-intl';

import LinearProgress from '@material-ui/core/LinearProgress';
import Card from 'common/components/Card'
import Font from 'common/components/Font';
import DialogContainer from '../DialogContainer';


const LoadingBar = styled(LinearProgress)`
  margin-top: 10px;
`;

const FetchingDialog = ({ fetchingDataOpen }) => {
  return (
    <DialogContainer open={fetchingDataOpen}>
      <Card padding="20px">
        <Font variant="h4" component="span">
          <b>
            <FormattedMessage id="dialogs.fetching.message" />
          </b>
        </Font>
        <LoadingBar />
      </Card>
    </DialogContainer>
  )
};

export default connect(fetchingDataSelector, {})(FetchingDialog);
