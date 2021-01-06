import React from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { theme } from 'src/theme';


const Spinner = styled(CircularProgress)`
  &.MuiCircularProgress-colorPrimary {
    color: ${theme.colors.grey5};
  }
`;

const DefaultButton = styled(Button)(({ size, overrides = {} }) => (`
  &.MuiButtonBase-root {
    background-color: ${overrides.background || theme.colors.blue1};
    color: ${overrides.color || theme.colors.grey5};
    text-transform: none;
    font-weight: bold;
    font-size: ${theme.fonts.sizes.lg};
    padding: ${size === 'large' ? '12px 23px' : '6px 18px'};

    &:hover {
      background-color: ${overrides.background || theme.colors.blue1};
    }
  }
  &.Mui-disabled {
    background-color: ${theme.colors.grey2};
    color: ${theme.colors.grey5};

  }
  &.Mui-disabled:hover {
    cursor: no-drop;
  }
`));

const LinkButton = styled(Button)((props) => (`
  &.MuiButtonBase-root {
    background-color: transparent;
    color: ${props.theme.colors.blue1};
    text-decoration: ${props.decoration || 'underline'};
    box-shadow: none;
    text-transform: none;
    font-weight: bold;

    &:hover {
      background-color: transparent;
    }
  }
`));

const ButtonSecondary = styled(DefaultButton)(({ overrides = {} }) => (`
  &.MuiButtonBase-root {
    background-color: ${overrides.background || theme.colors.grey2};
    color: ${overrides.color || theme.colors.grey5};
    &:hover {
      background-color: ${overrides.background || theme.colors.grey2};
    }
  }
`));

const getStyledComponent = (type) => {
  switch (type) {
    case 'link':
      return LinkButton;
    case 'secondary':
      return ButtonSecondary
    default:
      return DefaultButton;
  }
}

const LoadingButton = ({ loading, dmarcvariant, children, ...rest }) => {
  const Component = getStyledComponent(dmarcvariant);

  return (
    <Component {...rest}>
      {
        loading ? (
          <Spinner size={24} />
        ) : (
          <React.Fragment>
            { children }
          </React.Fragment>
        )
      }
    </Component>
  )
}

export default LoadingButton;
