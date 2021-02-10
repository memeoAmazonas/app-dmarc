import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { constants } from './actions';


export const reducers = {
  [constants.TOGGLE_RESET_PASSWORD]: (state, { payload }) => state.merge({
    resetPasswordOpen: payload,
  }),
  [constants.FETCHING_DATA]: (state, { payload }) => state.merge({ fetchingDataOpen: payload }),
}

const initialState = Map({
  resetPasswordOpen: false,
  fetchingDataOpen: false,
  genericErrorOpen: false,
})

const reducer = handleActions(
  {
    [constants.TOGGLE_RESET_PASSWORD]: (state, { payload }) => state.merge({
      resetPasswordOpen: payload,
    }),
    [constants.FETCHING_DATA]: (state, { payload }) => state.merge({
      fetchingDataOpen: payload,
    }),
    [constants.DISPLAY_ERROR]: (state, { payload }) => state.merge({
      genericErrorOpen: payload,
    }),
  },
  initialState
);

export default reducer;
