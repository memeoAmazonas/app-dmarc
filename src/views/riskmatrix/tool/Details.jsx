import React from 'react';
import Divider from '@material-ui/core/Divider';
import Mx from 'views/riskmatrix/tool/types/Mx';
import styles from 'views/riskmatrix/tool/styles';
import Spf from 'views/riskmatrix/tool/types/Spf';
import Dkim from 'views/riskmatrix/tool/types/Dkim';
import Dmarc from 'views/riskmatrix/tool/types/Dmarc';

const Details = ({ data, name }) => {
  const classes = styles();
  return (
    <div className={classes.content}>
      <Divider />
      {name === 'mx' && <Mx data={data[name]} /> }
      { name === 'spf' && <Spf data={data[name]} /> }
      { name === 'dkim' && <Dkim data={data[name]} /> }
      { name === 'dmarc' && <Dmarc data={data[name]} /> }
    </div>
  );
};

export default Details;
