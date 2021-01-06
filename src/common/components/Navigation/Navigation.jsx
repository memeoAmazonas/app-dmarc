import React from 'react';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import LogoText from 'assets/images/logo-text.png';
import WhiteIcon from 'common/components/Utilities/WhiteIcon';
import SignOutListItem from './SignOutListItem';
import DashboardListItem from './DashBoardListItem';
import ChangePwdListItem from './ChangePwdListItem';


const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  img {
      width: 100px;
  }
`;

const ButtonWrapper = styled.div`
  text-align: right;
  width: 100%;
`;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    width: 280px;
    background-color: ${(props) => props.theme.colors.grey3}
  }
`;

const SideNavigation = ({ open, onMenuClick }) => {
  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <ButtonWrapper>
        <IconButton onClick={onMenuClick}>
          {WhiteIcon(ChevronLeftIcon)}
        </IconButton>
      </ButtonWrapper>
      <LogoWrapper>
        <img src={LogoText} width={100} height={100} alt="DMARC Guardian" />
      </LogoWrapper>
      <Divider />
      <List>
        <DashboardListItem />
        <Divider />
        <ChangePwdListItem />
        <Divider />
        <SignOutListItem />
      </List>
    </StyledDrawer>
  )
};

export default SideNavigation
