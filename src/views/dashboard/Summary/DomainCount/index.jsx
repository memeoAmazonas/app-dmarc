import React from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl'
import Card from 'common/components/Card';
import Skeleton from '@material-ui/lab/Skeleton';

import Font from 'common/components/Font';

const StyledCard = styled(Card)`
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &.MuiPaper-root {
      background-color: ${(props) => props.theme.colors.blue1};
      color: ${(props) => props.theme.colors.grey5};
  }
`;

const DomainCount = ({ amount }) => {
  return (
    <StyledCard>
      {
        amount > 0 ? (
          <Font variant="h2" component="h2">
            <FormattedMessage id="dashboard.summary.header" values={{ count: amount }} />
          </Font>
        ) : <Skeleton height={6} width="100%" />
      }
    </StyledCard>
  )
}

export default DomainCount;
