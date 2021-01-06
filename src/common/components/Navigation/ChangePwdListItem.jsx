import React from 'react';

import { connect } from 'react-redux';
import { toggleResetPassword } from 'rdx/dialogs/actions';

import { FormattedMessage } from 'react-intl';
import LockIcon from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Font from 'common/components/Font';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';

const ChangePwdListItem = ({ toggleDialog }) => {
  return (
    <ListItem button onClick={() => toggleDialog(true)}>
      <ListItemIcon>{WhiteIcon(LockIcon)}</ListItemIcon>
      <ListItemText
        primary={(
          <Font variant="h4" component="span" color="secondary">
            <FormattedMessage id="menu.changePassword" />
          </Font>
              )}
      />
    </ListItem>
  )
};

export default connect(
  undefined, { toggleDialog: toggleResetPassword }
)(ChangePwdListItem);
