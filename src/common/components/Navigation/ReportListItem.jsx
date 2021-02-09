import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssessmentIcon from '@material-ui/icons/Assessment';

import ListItemText from '@material-ui/core/ListItemText';
import Font from 'common/components/Font';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';

const ReportListItem = ({ history }) => {
  return (
    <ListItem button onClick={history.push.bind(this, '/report-360')}>
      <ListItemIcon>{WhiteIcon(AssessmentIcon)}</ListItemIcon>
      <ListItemText
        primary={(
          <Font variant="h4" component="span" color="secondary">
            <FormattedMessage id="menu.report360" />
          </Font>
        )}
      />
    </ListItem>
  )
};

export default withRouter(ReportListItem);
