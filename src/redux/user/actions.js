import { createAction } from 'redux-actions';

// Module Constants
export const USER_LOGOUT = 'app/dmarc/LOG_OUT';
export const CHANGE_LANGUAGE = 'app/dmarc/CHANGE_LANGUAGE'

export const constants = {
  USER_LOGOUT,
  CHANGE_LANGUAGE,
};

// Module Actions
export const logoutUser = createAction(USER_LOGOUT, () => {});
export const changeLanguage = createAction(CHANGE_LANGUAGE)

export const actions = {
  logoutUser,
  changeLanguage,
};
