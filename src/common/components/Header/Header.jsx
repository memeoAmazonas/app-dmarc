import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from 'assets/images/logo.png';

import { theme } from 'src/theme';
import Button from 'common/components/Button';
import LanguageMenu from 'common/components/LanguageMenu';

const LogoWrapper = styled.button`
  img {
      width: 40px;
  }
  background: transparent;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;

const LangWrapper = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const StyledAppBar = styled(AppBar)`
  &.MuiAppBar-root {
    padding-bottom: 5px;
    background-color: ${(props) => props.theme.colors.grey5};
    box-shadow:  0px 4px 10px -2px rgba(0,0,0,0.06), 0px 4px 10px -2px rgba(0,0,0,0.06), 0px 4px 10px -2px rgba(0,0,0,0.06) !important;
  }
`;


const Header = ({ onMenuClick, history }) => {
  return (
    <StyledAppBar position="relative" color="default">
      <Toolbar>
        <Button
          overrides={{
            background: 'none',
            color: theme.colors.grey7,
          }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </Button>
        <LogoWrapper onClick={history.push.bind(this, '/dashboard')}>
          <img src={Logo} alt="DMARC Guardian" />
        </LogoWrapper>
        <LangWrapper>
          <LanguageMenu />
        </LangWrapper>
      </Toolbar>
    </StyledAppBar>
  )
};


export default withRouter(Header);
