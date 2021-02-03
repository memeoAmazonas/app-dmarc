import React from 'react';
import uniqueId from 'lodash/uniqueId'
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';

const ShadedTableCell = styled(TableCell)`
  background-color: ${(props) => (props.type === 'dark' ? props.theme.colors.grey3 : 'inherit')};
  &.MuiTableCell-head, &.MuiTableCell-body {
    color: ${(props) => (props.type === 'dark' ? props.theme.colors.grey5 : 'inherit')};
  }
   &.MuiTableCell-head{
   position: sticky;
   }
`;

export const HeadItem = ({ translationKey, ...rest }) => {
  return (
    <ShadedTableCell {...rest}>
      <Font variant="h3" component="span" style={{ cursor: rest.pointer }}>
        <FormattedMessage id={translationKey} />
      </Font>
    </ShadedTableCell>
  )
}
const TableHeader = ({ titles, type = 'inherit', onClick = () => null }) => (
  <TableHead>
    <TableRow>
      {titles.map((item) => (
        <HeadItem
          align={item.align ? item.align : 'center'}
          key={uniqueId()}
          onClick={() => (item.key ? onClick(item.key) : null)}
          pointer={item.key ? 'pointer' : 'inherit'}
          type={type}
          translationKey={item.label}
          width={item.width}
        />
      ))}
    </TableRow>
  </TableHead>
);
export default TableHeader;
