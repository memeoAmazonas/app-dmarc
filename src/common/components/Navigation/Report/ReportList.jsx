import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Collapse, Divider, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import {
  Assessment, AssignmentLate, Business, ExpandLess, ExpandMore, Timeline,
} from '@material-ui/icons';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';
import ReportListItem from 'common/components/Navigation/Report/ReportListItem';
import Font from 'common/components/Font';


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
        <ListItemIcon>{WhiteIcon(Business)}</ListItemIcon>
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
        <ReportListItem url="/report-360" label="menu.reports.360" icon={Assessment} />
        <ReportListItem url="/report-forensic" label="menu.reports.forensic" icon={AssignmentLate} />
        <ReportListItem url="/histogram" label="menu.reports.histogram" icon={Timeline} />
      </CollapseM>
    </React.Fragment>
  );
};

export default ReportList;
