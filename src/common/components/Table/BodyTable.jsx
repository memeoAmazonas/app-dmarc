import keys from 'lodash/keys';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import uniqueId from 'lodash/uniqueId';
import Font from 'common/components/Font';
import React from 'react';

const BodyTable = ({ details, formatData, clasess }) => {
  const setItem = (value, key) => {
    if (formatData && formatData.format && formatData.format[key]) {
      return formatData.format[key](value);
    }
    return value;
  }
  const keysDetail = keys(details ? details[0] : {});
  const restStyles = (it) => (formatData && formatData.styles && formatData.styles[it]
    ? formatData.styles[it] : {})
  const content = details.map((item) => (
    <TableRow key={uniqueId()}>
      {
        keysDetail.map((it) => (
          <TableCell align="center" key={uniqueId()} className={clasess.body} {...restStyles(it)}>
            <Font variant="h5" component="span">
              <b>{setItem(item[it], it)}</b>
            </Font>
          </TableCell>
        ))
      }
    </TableRow>
  ))
  return (
    <TableBody>
      {content}
    </TableBody>
  )
}
export default BodyTable;
