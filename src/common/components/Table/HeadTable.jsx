import { TableCell, TableHead, TableRow } from '@material-ui/core';
import uniqueId from 'lodash/uniqueId';
import Font from 'common/components/Font';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';
import styled from 'styled-components';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';

const Content = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

const HeadTable = ({
  titles, onClick, clasess, orderByKey, asc, details,
}) => {
  const setIcon = (key) => {
    if (orderByKey === key) {
      if (asc === 'asc') {
        return WhiteIcon(ArrowDropDownOutlinedIcon, { width: 25, height: 25, cursor: 'pointer' });
      }
      return WhiteIcon(ArrowDropUpOutlinedIcon, { width: 25, height: 25, cursor: 'pointer' });
    }
    return null;
  }
  const head = titles.map((item) => (
    <TableCell
      key={uniqueId()}
      className={clasess.header}
      align={item.align ? item.align : 'center'}
      onClick={() => (item.key ? onClick(item.key) : null)}
    >
      <Content>
        <Font variant="h3" component="span" style={{ cursor: item.key ? 'pointer' : 'inherit' }}>
          <FormattedMessage id={item.label} />
        </Font>
        {details.length > 0 && item.key ? setIcon(item.key) : null }
      </Content>
    </TableCell>
  ));
  const notData = titles.map((item, index) => {
    return (
      <TableCell
        key={uniqueId()}
        className={clasess.body}
        align="left"
      >
        <Font variant="h3" component="span">
          { index === 0 ? <FormattedMessage id="not.have.data" /> : <FormattedMessage id="empty" /> }
        </Font>
      </TableCell>
    )
  });
  return (
    <TableHead>
      <TableRow>
        { head }
      </TableRow>
      <TableRow>
        {!(details.length > 0) && notData }
      </TableRow>
    </TableHead>
  )
}
export default HeadTable;
