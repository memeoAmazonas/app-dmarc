import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import Font from 'common/components/Font';
import Form, { validationSchema } from './Form'
import { AmplifySurface, HeaderContainer } from 'common/components/Amplify/Styled';


const ResetPassword = () => {
  const values = { current: '', newPassword: '', reenter: '' };

  return (
    <AmplifySurface width="300px">
      <HeaderContainer>
        <Font variant="h5" component="h1">
          <FormattedMessage id={'menu.changePassword'} />
        </Font>
      </HeaderContainer>
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
      >
        {(props) => (<Form {...props} />)}
      </Formik>
    </AmplifySurface>
  )
};


export default ResetPassword;
