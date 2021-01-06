import React, { useState } from 'react';
import * as Yup from 'yup';
import { injectIntl } from 'react-intl';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl';
import { toggleResetPassword } from 'rdx/dialogs/actions';
import { theme } from 'src/theme';
import Font from 'common/components/Font';
import Button from 'common/components/Button';
import TextInput from 'common/components/TextInput';
import MessageBox from 'common/components/MessageBox'
import { ButtonsContainer } from 'common/components/Amplify/Styled';


export const validationSchema = Yup.object().shape({
  current: Yup.string()
    .required('Enter your current password'),
  newPassword: Yup.string()
    .required('Enter your new password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  reenter: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Re-enter your new password'),
});

const Form = (props) => {
  const [messageProps, setMessageProps] = useState({})
  const [loading, setLoading] = useState(false)

  const {
    values: {
      current, newPassword, reenter,
    },
    intl,
    errors,
    touched,
    handleChange,
    isValid,
    setFieldTouched,
    toggleDialog,
    resetForm,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(user, props.values.current, props.values.newPassword);
      setMessageProps({ variant: 'success', message: 'Password Changed' })
      resetForm({})
    } catch (err) {
      setMessageProps({ variant: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={changePassword} method="post">
      <TextInput
        autoFocus
        type="password"
        variant="outlined"
        placeholder={intl.formatMessage({ id: 'password.current'})}
        id="current"
        label={intl.formatMessage({ id: 'password.current'})}
        name="current"
        helperText={touched.current ? errors.current : ''}
        error={touched.current && Boolean(errors.current)}
        onChange={change.bind(null, 'current')}
        value={current}
      />
      <TextInput
        type="password"
        variant="outlined"
        placeholder={intl.formatMessage({ id: 'password.new'})}
        label={intl.formatMessage({ id: 'password.new'})}
        name="newPassword"
        helperText={touched.newPassword ? errors.newPassword : ''}
        error={touched.newPassword && Boolean(errors.newPassword)}
        onChange={change.bind(null, 'newPassword')}
        value={newPassword}
      />
      <TextInput
        type="password"
        variant="outlined"
        placeholder={intl.formatMessage({ id: 'password.confirm'})}
        id="reenter"
        label={intl.formatMessage({ id: 'password.confirm'})}
        name="reenter"
        helperText={touched.reenter ? errors.reenter : ''}
        error={touched.reenter && Boolean(errors.reenter)}
        onChange={change.bind(null, 'reenter')}
        value={reenter}
      />
      <MessageBox {...messageProps} />
      <ButtonsContainer>
        <Button
          onClick={() => toggleDialog(false)}
          size="large"
          overrides={{
            background: theme.colors.blue5,
          }}
        >
          <Font variant="h5">
            <FormattedMessage id={"menu.cancel"} />
          </Font>
        </Button>
        <Button loading={loading} type="submit" size="large" disabled={!isValid}>
          <Font variant="h5">
            <FormattedMessage id={"menu.change"} />
          </Font>
        </Button>
      </ButtonsContainer>
    </form>
  )
}

export default injectIntl(connect(
  undefined, { toggleDialog: toggleResetPassword }
)(Form));
