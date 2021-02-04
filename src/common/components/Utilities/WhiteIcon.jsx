import React from 'react';

import { theme } from 'src/theme';

const WhiteIcon = (Icon, styles = {}) => {
  return (<Icon style={{ color: theme.colors.grey5, ...styles }} />)
}

export default WhiteIcon;
