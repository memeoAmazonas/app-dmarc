import React from 'react';
import styles from 'views/riskmatrix/tool/styles';
import { keys } from 'lodash';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable';
import { FormattedMessage } from 'react-intl';

const Dmarc = ({ data }) => {
  const classes = styles();
  const scroll = data.length > 2 ? { overflowY: 'scroll', maxHeight: 150 } : { maxHeight: 150 }
  const Row = data && data.map((it, index) => {
    return (
      <div className={index % 2 ? classes.ListItemOdd : classes.ListItemEven}>
        <span className={classes.mxItemTitle}>{keys(it)[0]} </span>
        <span className={classes.mxItem}>{it[keys(it)[0]]}</span>
      </div>
    );
  });
  if (data.length > 0) {
    return (
      <div style={scroll}>
        {Row}
      </div>
    );
  }
  return <EmptyMessage><FormattedMessage id="not.have.data" /></EmptyMessage>
};

export default Dmarc;
