import React from 'react';

import Dialog from '@material-ui/core/Dialog';

const DialogContainer = ({ onClose, children, open = false }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      {children}
    </Dialog>
  )
};

export default DialogContainer;
