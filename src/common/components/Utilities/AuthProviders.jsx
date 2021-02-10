import React from 'react';
import _ from 'lodash';

import { Auth } from 'aws-amplify';

/*
 * Wraps the component injecting user information as props
 * to the consumers.
 */
export const withUserInfo = (Wrapped) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        customerId: undefined,
        customerTable: undefined,
      };
    }

    componentDidMount() {
      this.setUserInfo();
    }

    /*
    * Get the user info from aws amplify and
    * update the state
    */
    async setUserInfo() {
      const userInfo = await Auth.currentUserInfo();
      const { attributes } = userInfo;
      // Default the customerId to 100 if not set
      this.setState({ customerId: _.get(attributes, 'custom:CustomerId', 100), customerTable: _.get(attributes, 'custom:TableName', '') });
    }

    render() {
      const { customerId, customerTable } = this.state;
      // Add the user info as props to the wrapped component
      return <Wrapped {...this.props} customerId={customerId} customerTable={customerTable} />
    }
  }
}
