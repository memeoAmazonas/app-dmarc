import React from 'react';
import uniqueId from 'lodash/uniqueId';
import keys from 'lodash/keys';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import Font from 'common/components/Font';

const ShadedTableCell = styled(TableCell)((props) => (`
  background-color: ${props.dmarcvariant === 'dark' ? props.theme.colors.blue1 : 'inherit'};
  &.MuiTableCell-head, &.MuiTableCell-body {
    color: ${props.dmarcvariant === 'dark' ? props.theme.colors.grey5 : 'inherit'};
  };
`));
const BodyItem = ({ children, ...rest }) => {
  return (
    <ShadedTableCell {...rest}>
      <Font variant="h5" component="span">
        <b>{ children }</b>
      </Font>
    </ShadedTableCell>
  )
}

const BodyTable = ({ details, type = 'inherit', formatData }) => {
  const setItem = (value, key) => {
    if (formatData && formatData.format && formatData.format[key]) {
      return formatData.format[key](value);
    }
    return value;
  }
  const keysDetail = keys(details ? details[0] : {});
  const items = details.map((item) => (
    <TableRow hover key={uniqueId()}>
      {keysDetail.map((it) => (
        <BodyItem key={uniqueId()} dmarcvariant={type} align="center" {...formatData.styles[it]}>
          {setItem(item[it], it)}
        </BodyItem>
      )) }
    </TableRow>
  ))
  return (
    <TableBody>
      { items }
    </TableBody>
  );
}

export default BodyTable;
