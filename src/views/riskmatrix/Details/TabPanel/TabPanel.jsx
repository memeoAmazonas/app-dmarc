import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const TabPanel = (props) => {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      <Box p={1}>{children}</Box>
    </Typography>
  );
}

export default TabPanel;
