import React from 'react';
import { SignIn } from 'aws-amplify-react';
import styled from 'styled-components';
import Auth from '@aws-amplify/auth';
import { injectIntl, FormattedMessage, useIntl } from 'react-intl';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import Logo from 'assets/images/logo-text.png';
import Button from 'common/components/Button';
import Font from 'common/components/Font';

import TextInput from 'common/components/TextInput';
import { useDispatch } from 'react-redux';
import Action from 'rdx/newRedux/actions/Action';
import {
  AmplifyContainer, AmplifyWrapper, AmplifySurface,
} from '../Styled';

export function useFormatMessage(messageId) {
  return useIntl().formatMessage({ id: messageId })
}

/*
 * This is to override the custom sign in so we can skin it
 * to match the application theme
 */


const LoginHeader = styled.header`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

/*
 * This is to override the custom sign in so we can skin it
 * to match the application theme
 */
class CustomSignIn extends SignIn {
  constructor(props) {
    super(props);
    this.state = Object.assign({
      loading: false,
    }, super.state); // extend parent state
    this.onChangeText = this.onChangeText.bind(this);
  }

  setLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  /*
   * Override amplify signing and display a spinner
   * in the custom sign in button before continuing.
  */
  async getResult(username, password) {
    if (!username || username === '') {
      sessionStorage.setItem('LOGIN_ERROR', 'ERROR de username');
      return;
    }
    try {
      const user = await Auth.signIn(username, password);
    } catch (e) {
      //console.log('e.message', e.message);
    }
  }

  signIn() {
    this.setLoading();
    try {
      sessionStorage.setItem('init', 'init');
      const username = this.getUsernameFromInput() || '';
      const { password } = this.inputs;
      this.getResult(username, password);
      super.signIn();
    } catch (error) {
      this.setLoading();
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.signIn()
    }
  }

  onChangeText(event) {
    const actuallyEvent = event;
    actuallyEvent.target.value = event.target.value.replaceAll(' ', '');
    this.handleInputChange(actuallyEvent);
  }

  showComponent() {
    const { loading } = this.state;
    return (
      <AmplifyContainer container>
        <AmplifyWrapper item md={12}>
          <AmplifySurface>
            <LoginHeader>
              <img src={Logo} width={100} height={100} alt="logo" />
            </LoginHeader>
            <form>
              <Grid item md={12}>
                <FormattedMessage id="login.username">
                  {(placeholder) => (
                    <TextInput
                      autoFocus
                      id="username"
                      name="username"
                      label={placeholder}
                      onChange={this.onChangeText}
                      margin="normal"
                      variant="outlined"
                      placeholder={placeholder}
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid item md={12}>
                <FormattedMessage id="password">
                  {(placeholder) => (
                    <TextInput
                      id="password"
                      name="password"
                      label={placeholder}
                      type="password"
                      onChange={this.handleInputChange}
                      autoComplete="current-password"
                      margin="normal"
                      variant="outlined"
                      placeholder="******************"
                    />
                  )}
                </FormattedMessage>
              </Grid>
              <Grid item md={12}>
                <p>
                  <Font variant="body2" component="span">
                    <FormattedMessage id="password.forgot" />{' '}
                  </Font>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link onClick={() => super.changeState('forgotPassword')}>
                    <Font variant="body2" component="span">
                      <FormattedMessage id="password.reset" />
                    </Font>
                  </Link>
                </p>
              </Grid>
              <Grid item md={12}>
                <Button
                  onClick={this.signIn.bind(this)}
                  onKeyDown={this.onKeyDown.bind(this)}
                  variant="contained"
                  size="large"
                  loading={loading}
                >
                  <Font variant="h5"><FormattedMessage id="login" /></Font>
                </Button>
              </Grid>
            </form>
          </AmplifySurface>
        </AmplifyWrapper>
      </AmplifyContainer>
    );
  }
}

export default injectIntl(CustomSignIn);
