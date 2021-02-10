import React from 'react';

import { connect } from 'react-redux';
import { resetPasswordSelector } from 'rdx/dialogs/selectors';

import ResetPassword from './ResetPassword';
import DialogContainer from '../DialogContainer';


const ResetPasswordDialog = ({ resetPasswordOpen }) => {
  return (
    <DialogContainer open={resetPasswordOpen}>
      <ResetPassword />
    </DialogContainer>
  )
};

export default connect(resetPasswordSelector, {})(ResetPasswordDialog);
