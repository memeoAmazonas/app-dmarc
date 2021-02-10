import React from 'react';
import styled from 'styled-components';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl'


const ShadedTableCell = styled(TableCell)`
  background-color: ${(props) => (props.type === 'dark' ? props.theme.colors.grey3 : 'inherit')};
  &.MuiTableCell-head, &.MuiTableCell-body {
    color: ${(props) => (props.type === 'dark' ? props.theme.colors.grey5 : 'inherit')};
  }
`;

const HeadItem = ({ translationKey, ...rest }) => {
  return (
    <ShadedTableCell {...rest}>
      <Font variant="body2" component="span">
        <FormattedMessage id={translationKey} />
      </Font>
    </ShadedTableCell>
  )
}

const DetailsTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <HeadItem translationKey="dashboard.details.table.header1" align="left" />
        <HeadItem translationKey="dashboard.summary.messagesTotal" align="center" />
        <HeadItem translationKey="dashboard.summary.dmarcPass" align="center" />
        <HeadItem translationKey="dashboard.summary.dmarcPassPerc" align="center" />
        <HeadItem translationKey="dashboard.summary.authMessages" type="dark" align="center" />
        <HeadItem translationKey="dashboard.summary.authMessagesPerc" type="dark" align="center" />
        <HeadItem translationKey="dashboard.summary.authenticatedMessages" type="dark" align="center" />
        <HeadItem translationKey="dashboard.summary.authenticatedMessagesPerc" type="dark" align="center" />
      </TableRow>
    </TableHead>
  )
}

export default DetailsTableHead;
