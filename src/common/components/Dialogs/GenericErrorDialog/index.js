import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import { genericErrorSelector } from 'rdx/dialogs/selectors';
import { FormattedHTMLMessage } from 'react-intl';

import { displayError } from 'rdx/dialogs/actions';
import Button from 'common/components/Button';
import Card from 'common/components/Card';
import Font from 'common/components/Font';
import DialogContainer from '../DialogContainer';

const CardContainer = styled(Card)`
  max-width: 200px;
  text-align: left;
`;

const ButtonWrapper = styled.div`
  margin-top: 25px;
  width: 100%;
  text-align: right;
`;

const GenericErrorDialog = ({ genericErrorOpen, setDialogState }) => {

  const dismissError = () => {
    setDialogState(false)
  }

  return (
    <DialogContainer open={genericErrorOpen}>
      <CardContainer padding="20px">
        <Font variant="h4" component="span">
          <FormattedHTMLMessage id="dialogs.error.message" />
        </Font>
        <ButtonWrapper>
          <Button size="small" onClick={dismissError}>Ok</Button>
        </ButtonWrapper>
      </CardContainer>
    </DialogContainer>
  )
};

const mapDispatchtoProps = {
  setDialogState: displayError,
}

export default connect(genericErrorSelector, mapDispatchtoProps)(GenericErrorDialog);
