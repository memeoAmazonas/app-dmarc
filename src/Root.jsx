import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {
  Authenticator, ForgotPassword, Greetings, SignIn, SignUp,
} from 'aws-amplify-react';
import { Router } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { CustomForgotPassword, CustomSignIn } from 'common/components/Amplify';
import I18NProvider from 'common/components/Utilities/I18NProvider'
import GetSelector from 'rdx/newRedux/selectores/GetSelector';
import { KEY_LANGUAGE } from 'rdx/newRedux/selectores/keys';
import awsconfig from './aws-exports';
import { theme } from './theme';

const SIGNED_IN_STATE = 'signedIn';
const getLanguage = () => {
  return GetSelector(KEY_LANGUAGE);
}
class Root extends React.PureComponent {
  get content() {
    const { routes, history } = this.props
    return <Router history={history}>{routes}</Router>
  }

  render() {
    const { store, authState } = this.props

    if (authState === SIGNED_IN_STATE) {
      return (
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <I18NProvider>
              {this.content}
            </I18NProvider>
          </Provider>
        </ThemeProvider>
      )
    }
    return null
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
}

const withAuth = (WrappedComponent) => {
  return class Wrapper extends React.PureComponent {
    constructor(props) {
      super(props)
      this._configureJWTToken = this.configureJWTToken.bind(this);
    }

    /*
     * Get the jwt token from the session and configure
     * axios common headers to append the authorization
     * header with the token.
     */
    // eslint-disable-next-line class-methods-use-this
    async configureJWTToken(state) {
      if (state === SIGNED_IN_STATE) {
        const sessionInfo = await Auth.currentSession();
        const { jwtToken } = sessionInfo.idToken;

        // eslint-disable-next-line dot-notation
        axios.default.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        axios.default.defaults.timeout = 60000 * 2;
      }
    }

    render() {
      const { store } = this.props;
      return (
        <Provider store={store}>
          <I18NProvider>
            <Authenticator
              hide={[SignIn, SignUp, Greetings, ForgotPassword]}
              amplifyConfig={awsconfig}
              onStateChange={this._configureJWTToken}
              errorMessage={sessionStorage.getItem('LOGIN_ERROR')}
            >
              <CustomSignIn />
              <CustomForgotPassword override="ForgotPassword" />
              <WrappedComponent {...this.props} />
            </Authenticator>
          </I18NProvider>
        </Provider>
      )
    }
  }
}


// Add amplify auth auto genereated authentication
export default withAuth(Root);
