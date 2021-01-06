import React from 'react';
import { withRouter } from 'react-router-dom';

import { FormattedMessage } from 'react-intl';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Font from 'common/components/Font';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';

const DashboardListItem = ({ history }) => {
  return (
    <ListItem button onClick={history.push.bind(this, '/dashboard')}>
      <ListItemIcon>{WhiteIcon(TuneOutlinedIcon)}</ListItemIcon>
      <ListItemText
        primary={(
          <Font variant="h4" component="span" color="secondary">
            <FormattedMessage id="menu.dashboard" />
          </Font>
          )}
      />
    </ListItem>
  )
};

export default withRouter(DashboardListItem);
