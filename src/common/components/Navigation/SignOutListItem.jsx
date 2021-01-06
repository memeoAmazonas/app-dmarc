import React from 'react';
import { Auth } from 'aws-amplify';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { actions as userActions } from 'rdx/user/actions';
import { FormattedMessage } from 'react-intl';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Font from 'common/components/Font';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';


const SignOutListItem = ({ history, logoutUser }) => {
  const signOutRediect = async () => {
    await Auth.signOut();
    logoutUser();
    history.push('/');
  }

  return (
    <ListItem button onClick={signOutRediect}>
      <ListItemIcon>{WhiteIcon(ArrowBackIcon)}</ListItemIcon>
      <ListItemText
        primary={(
          <Font variant="h4" component="span" color="secondary">
            <FormattedMessage id="menu.signOut" />
          </Font>
              )}
      />
    </ListItem>
  )
};

export default connect(null, { ...userActions })(withRouter(SignOutListItem));
