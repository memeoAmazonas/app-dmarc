import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Skeleton from '@material-ui/lab/Skeleton';

import Font from 'common/components/Font';

const Header = styled.header`
  margin-bottom: 10px;
`;

const ChartHeader = ({ translationKey, ready }) => {
  return (
    <Header>
      {
        ready ? (
          <Font variant="h5" component="h2">
            <FormattedMessage id={translationKey} />
          </Font>
        ) : <Skeleton height={6} width="50%" />
      }
    </Header>
  )
};

export default ChartHeader;
