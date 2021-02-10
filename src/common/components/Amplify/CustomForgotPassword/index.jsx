import React from 'react';
import { ForgotPassword } from 'aws-amplify-react';
import Link from '@material-ui/core/Link';

import Button from 'common/components/Button';
import TextInput from 'common/components/TextInput';
import Font from 'common/components/Font';
import {
  AmplifyContainer, AmplifyWrapper, AmplifySurface,
  HeaderContainer, ButtonsContainer,
} from '../Styled';


class CustomForgotPassword extends ForgotPassword {
  sendView() {
    return (
      <TextInput
        variant="outlined"
        autoFocus
        placeholder="Enter your username"
        key="username"
        name="username"
        onChange={this.handleInputChange}
      />
    )
  }

  submitView() {
    return (
      <React.Fragment>
        <TextInput
          autoFocus
          variant="outlined"
          placeholder="Code"
          label="Code"
          key="code"
          name="code"
          autoComplete="off"
          onChange={this.handleInputChange}
        />
        <TextInput
          variant="outlined"
          placeholder="New Password"
          label="New Password"
          type="password"
          key="password"
          name="password"
          autoComplete="off"
          onChange={this.handleInputChange}
        />
      </React.Fragment>
    )
  }

  render() {
    const { authState, authData = {} } = this.props;

    if (authState !== 'forgotPassword') {
      return null;
    }

    return (
      <AmplifyContainer container>
        <AmplifyWrapper item md={12}>
          <AmplifySurface width="310px">
            <HeaderContainer>
              <Font variant="h5" component="h1">
                Reset your password
              </Font>
            </HeaderContainer>
            {this.state.delivery || authData.username
              ? this.submitView()
              : this.sendView()}
            <ButtonsContainer>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link variant="caption" onClick={() => super.changeState('signIn')}>
                Back to sign in
              </Link>
              {this.state.delivery || authData.username ? (
                <Button size="large" onClick={super.submit.bind(this)}>
                  <Font variant="h5">Submit</Font>
                </Button>
              ) : (
                <Button size="large" onClick={super.send.bind(this)}>
                  <Font variant="h5">Send Code</Font>
                </Button>
              )}
            </ButtonsContainer>
          </AmplifySurface>
        </AmplifyWrapper>
      </AmplifyContainer>
    )
  }
}

export default CustomForgotPassword;
