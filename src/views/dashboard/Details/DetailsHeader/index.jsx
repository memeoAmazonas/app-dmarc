import React from 'react';

import { FormattedMessage } from 'react-intl';
import Font from 'common/components/Font';

const DetailsHeader = () => {
  return (
    <React.Fragment>
      <Font variant="h3" component="h2">
        <FormattedMessage id="dashboard.details.header" />
      </Font>
    </React.Fragment>
  )
};

export default DetailsHeader;
