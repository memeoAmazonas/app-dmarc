import React from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';

import { theme } from 'src/theme'
import Font from 'common/components/Font';

const StyledTextField = styled(TextField)`
  width: 100%;
  input {
    color: ${theme.colors.grey4} !important;
  }
`;

const TextInput = (props) => {
  return (
    <Font component="span">
      <StyledTextField {...props} />
    </Font>
  )
};

export default TextInput;
