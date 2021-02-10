import React from 'react';
import ResetPasswordDialog from './ResetPasswordDialog';
import FetchingDialog from './FetchingDialog'
import GenericErrorDialog from './GenericErrorDialog'

export { default } from './DialogContainer';

export const AppDialogs = () => {
  return (
    <React.Fragment>
      <ResetPasswordDialog />
      <FetchingDialog />
      <GenericErrorDialog />
    </React.Fragment>
  )
}
