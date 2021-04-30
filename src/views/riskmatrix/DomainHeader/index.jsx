import React from 'react';
import styled from 'styled-components';
import isNil from 'lodash/isNil';

import Skeleton from '@material-ui/lab/Skeleton';

import Font from 'common/components/Font';
import { theme } from 'src/theme';

const StyledHeader = styled.header`
  margin-bottom: 25px;
`;

const DomainHeader = ({ domain }) => {
  return (
    <StyledHeader>
      {
      !isNil(domain) ? (
        <React.Fragment>
          <Font variant="h5" component="h2" style={{ fontSize: 20, color: theme.colors.blue1 }}>
            <b>{domain}</b>
          </Font>
        </React.Fragment>
      ) : <Skeleton height={6} width="30%" />
    }
    </StyledHeader>
  )
};

export default DomainHeader;
