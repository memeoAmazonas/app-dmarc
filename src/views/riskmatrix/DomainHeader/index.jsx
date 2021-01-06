import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';

import Skeleton from '@material-ui/lab/Skeleton';

import Font from 'common/components/Font';

const StyledHeader = styled.header`
  margin-bottom: 25px;
`;

const DomainHeader = ({ domain }) => {
  return (
    <StyledHeader>
      {
      !_.isNil(domain) ? (
        <React.Fragment>
          <Font variant="h5" component="h2">
            {domain}
          </Font>
        </React.Fragment>
      ) : <Skeleton height={6} width="30%" />
    }
    </StyledHeader>
  )
};

export default DomainHeader;
