import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import ListItemText from '@material-ui/core/ListItemText';
import Font from 'common/components/Font';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';

const ReportListItem = ({
  history, url, label, icon,
}) => {
  return (
    <ListItem
      button
      onClick={history.push.bind(this, url)}
    >
      <ListItemIcon>{WhiteIcon(icon)}</ListItemIcon>
      <ListItemText
        primary={(
          <Font variant="h4" component="span" color="secondary">
            <FormattedMessage id={label} />
          </Font>
        )}
      />
    </ListItem>
  );
}
export default withRouter(ReportListItem);
