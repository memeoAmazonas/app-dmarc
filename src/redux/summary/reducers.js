import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { DEFAULT_DISPLAY } from 'common/constants/constants'
import { asyncActions, constants } from './actions'


// Module reduces - Update state
export const reducers = {
  [asyncActions.dataActionName]: (state, { payload }) => state.merge({
    domains: { ...payload },
  }),
  [constants.SELECT_DOMAIN]: (state, { payload: { domain } }) => state.merge({
    domain,
  }),
  [constants.SELECT_DISPLAY]: (state, { payload: { display } }) => state.merge({
    display,
  }),
}

const initialState = {
  display: DEFAULT_DISPLAY,
  domain: undefined,
  domains: {},
}

export default handleActions(reducers, Map(initialState));
