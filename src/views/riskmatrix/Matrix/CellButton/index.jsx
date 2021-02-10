import React from 'react';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

import { theme } from 'src/theme';
import Font from 'common/components/Font';

const buttonBackgroundColor = ({ status }) => {
  if (status === undefined) {
    return 'transparent';
  }
  if (status > 1) {
    return theme.colors.blue5;
  }
  if (status < 0) {
    return theme.colors.red1;
  }

  return theme.colors.blue1;
}


const StyledButton = styled(Button)(({ meta }) => (`
  width: 10px;
  &.MuiButtonBase-root {
    box-shadow: ${meta.selected ? '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);' : 'none'};
    transform: ${meta.selected ? 'scale(1.1)' : 'none'};
    min-width: ${meta.minWidth};
    padding: ${meta.isHeader ? '0px' : '15px 45px'};
    margin: 10px;
    background-color: ${buttonBackgroundColor(meta)};
  }
  & .MuiButton-label {
    color: ${meta.isHeader ? theme.colors.grey7 : theme.colors.grey5}
  }
  &.MuiButton-root:hover:hover {
    background-color: ${buttonBackgroundColor(meta)};
    transition: all ease-in-out 0.2s;
    transform: ${meta.isHeader ? 'none' : 'scale(1.1)'};
    box-shadow: ${meta.isHeader ? 'none' : '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'};
  }
`));

const CellButton = ({ label, meta = {}, ...rest }) => (
  <StyledButton {...rest} meta={meta}>
    <Font variant={meta.isHeader ? 'body1' : 'h3'} component="span">
      {label}
    </Font>
  </StyledButton>
)
export default CellButton;
