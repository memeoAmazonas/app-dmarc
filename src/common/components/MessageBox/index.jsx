import React from 'react';
import styled from 'styled-components';

import { theme } from 'src/theme';
import Font from 'common/components/Font';

const ErrorBox = styled.div`
  border: 1px solid ${theme.colors.red1};
  padding: 10px;
  background-color: rgba(245, 97, 97, 0.4);
  & .MuiTypography-body1 {
    color: ${theme.colors.red1}
  }
`;

const SuccessBox = styled.div`
  border: 1px solid ${theme.colors.blue1};
  padding: 10px;
  background-color: rgba(63, 151, 233, 0.4);
  & .MuiTypography-body1 {
    color: ${theme.colors.blue1}
  }
`;

const MessageBox = ({ message, variant = 'error' }) => {
  const Box = variant === 'error' ? ErrorBox : SuccessBox
  return (
    <React.Fragment>
      { message ? (
        <Box>
          <Font variant="body1" component="span">
            { message }
          </Font>
        </Box>
      ) : (null)
    }
    </React.Fragment>
  )
}

export default MessageBox;
