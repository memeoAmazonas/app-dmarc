import React from 'react';

import styled from 'styled-components';

import Navigation from 'common/components/Navigation';
import { Header } from 'common/components/Header';
import { AppDialogs } from 'common/components/Dialogs';

const LayoutWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.grey1};
  box-shadow: inset 0 0 20px 10px rgba(166, 166, 166, 0.3);
  min-height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  padding: 30px;
  padding-bottom: 100px;
`;

class Layout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      menuOpen: false,
    }
    this._menuToggle = this.menuToggle.bind(this);
  }

  menuToggle() {
    this.setState((s) => ({ menuOpen: !s.menuOpen }));
  }

  render() {
    const { children } = this.props;
    const { menuOpen } = this.state;
    return (
      <LayoutWrapper>
        <Navigation open={menuOpen} onMenuClick={this._menuToggle} />
        <Header onMenuClick={this._menuToggle} />
        <MainContent>
          { children }
        </MainContent>
        <AppDialogs />
      </LayoutWrapper>
    )
  }
}

export default Layout;
