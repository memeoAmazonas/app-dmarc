import React from 'react';
import styled from 'styled-components';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';
import ReportListItem from 'common/components/Navigation/Report/ReportListItem';
import BusinessIcon from '@material-ui/icons/Business';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

const CollapseM = styled(Collapse)`
.MuiCollapse-wrapper {
  padding-left: 20px;
}
`
const ReportList = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>{WhiteIcon(BusinessIcon)}</ListItemIcon>
        <ListItemText
          primary={(
            <Font variant="h4" component="span" color="secondary">
              <FormattedMessage id="menu.reports" />
            </Font>
          )}
        />
        {open ? <ListItemIcon>{WhiteIcon(ExpandLess)}</ListItemIcon>
          : <ListItemIcon>{WhiteIcon(ExpandMore)}</ListItemIcon>}
      </ListItem>
      <Divider />
      <CollapseM in={open} timeout="auto" unmountOnExit>
        <ReportListItem url="/report-360" label="menu.reports.360" icon={AssessmentIcon} />
        <ReportListItem url="/report-forensic" label="menu.reports.forensic" icon={AssignmentLateIcon} />
      </CollapseM>
    </React.Fragment>
  );
};

export default ReportList;
