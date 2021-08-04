import React from 'react';
import styles from 'views/riskmatrix/tool/styles';
import { EmptyMessage } from 'views/riskmatrix/Details/DetailsTable';
import { FormattedMessage } from 'react-intl';

const Mx = ({ data }) => {
  const classes = styles();
  const scroll = data.length > 5 ? { overflowY: 'scroll', maxHeight: 150 } : { maxHeight: 150 }

  const Row = data && data.map((it, index) => {
    const { priority, url } = it;
    return (
      <div className={index % 2 ? classes.ListItemOdd : classes.ListItemEven}>
        <span className={classes.mxItemTitle}>{priority} </span>
        <span className={classes.mxItem}>{url}</span>
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

export default Mx;
