import React from 'react';
import styled from 'styled-components';

import { theme } from 'src/theme';
import Font from 'common/components/Font';

const Message = styled.div((props) => (`
border: 1px solid ${props.borderColor};
padding: 10px;
background-color: ${props.backgroundColor};
  & .MuiTypography-body1 {
    color: ${props.color}
  }
`));

const MessageBox = ({
  message,
  variant = 'error',
  rest = {},
}) => {
  const isError = variant === 'error';
  const { bg, borderColor, color } = rest;
  const border = borderColor || (isError ? theme.colors.red1 : theme.colors.blue1);
  const backgroundColor = bg || (isError ? 'rgba(245, 97, 97, 0.4)' : 'rgba(63, 151, 233, 0.4)');
  const fontColor = color || (isError ? theme.colors.red1 : theme.colors.blue1);
  return (
    <React.Fragment>
      { message && (
        <Message borderColor={border} backgroundColor={backgroundColor} color={fontColor}>
          <Font variant="body1" component="span">
            { message }
          </Font>
        </Message>
      )}
    </React.Fragment>
  )
}

export default MessageBox;
