import React from 'react';
import styled from 'styled-components';

import Skeleton from '@material-ui/lab/Skeleton';
import Font from 'common/components/Font';

const Header = styled.header`
  text-align: left;
  padding-bottom: 0 !important;
  min-height: 35px;
  margin-bottom: 10px;
  color: #FFF;
`;

const InfoHeader = ({ ready, header }) => {
  return (
    <React.Fragment>
      {
        ready ? (
          <Header>
            <Font
              variant="h4"
              component="h2"
              style={{
                background: '#3E97E8', padding: 6, fontWeight: 'bold',
              }}
            >
              {header}
            </Font>
          </Header>
        ) : <Skeleton height={6} width="40%" />
      }
    </React.Fragment>
  )
}

export default InfoHeader;
