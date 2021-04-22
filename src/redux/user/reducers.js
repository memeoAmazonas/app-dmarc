import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import { LANG_CODES } from 'src/common/components/LanguageMenu/index';
import { CHANGE_LANGUAGE } from './actions';


const getCode = (code) => {
  if ([LANG_CODES.ENGLISH, LANG_CODES.SPANISH].includes(code)) {
    localStorage.setItem('lang', code);
    return code;
  }
  localStorage.setItem('lang', LANG_CODES.SPANISH);
  return LANG_CODES.SPANISH
}

const initialState = Map({
  language: localStorage.getItem('lang') || getCode(window.navigator.language),
})

export const reducers = {
  [CHANGE_LANGUAGE]: (state, { payload }) => {
    localStorage.setItem('lang', payload);
    return state.merge({
      language: payload,
    })
  },
}

export default handleActions(reducers, initialState);
