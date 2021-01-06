import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { theme } from 'src/theme';

export const AmplifyContainer = styled(Grid)`
  background-color: ${theme.colors.grey1};
`;

export const AmplifyWrapper = styled(Grid)`
  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img {
    width: 100px;
  }
  a:hover {
    cursor: pointer;
  }
`;

export const AmplifySurface = styled(Paper)`
  width: ${(props) => (props.width ? props.width : 'auto')};
  min-width: ${(props) => (props.minWidth ? props.minWidth : '310px')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  padding: 20px;

  & .MuiTextField-root {
    margin-bottom: 15px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;


export const HeaderContainer = styled.div`
  margin-bottom: 15px;
`;
