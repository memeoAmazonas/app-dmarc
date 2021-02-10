import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { CHANGE_LANGUAGE } from './actions';
import { LANG_CODES } from 'src/common/components/LanguageMenu/index';


const getCode = (code) => {
  if ([LANG_CODES.ENGLISH, LANG_CODES.SPANISH].includes(code)) {
    return code
  }
  return LANG_CODES.SPANISH
}

const initialState = Map({
  language: getCode(window.navigator.language)
})

export const reducers = {
  [CHANGE_LANGUAGE]: (state, { payload }) => state.merge({
    language: payload,
  }),
}

export default handleActions(reducers, initialState);
