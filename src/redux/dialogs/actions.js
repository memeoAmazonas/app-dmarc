import { createAction } from 'redux-actions';

const TOGGLE_RESET_PASSWORD = 'app/dmarc/dialogs/TOGGLE_RESET_PASSWORD';
const FETCHING_DATA = 'app/dmarc/dialogs/FETCHING_DATA';
const DISPLAY_ERROR = 'app/dmarc/dialogs/DISPLAY_ERROR';

export const constants = {
  TOGGLE_RESET_PASSWORD,
  FETCHING_DATA,
  DISPLAY_ERROR,
}

export const toggleResetPassword = createAction(TOGGLE_RESET_PASSWORD)
export const fetchingData = createAction(FETCHING_DATA)
export const displayError = createAction(DISPLAY_ERROR)

export const actions = {
  toggleResetPassword,
  fetchingData,
  displayError,
};
