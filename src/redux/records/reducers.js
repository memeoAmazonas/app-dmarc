import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  asyncActions, RESET_RECORDS, SET_MATRIX_FILTER, SET_DATE_FILTER,
} from './actions';


const initialState = Map({
  items: [],
  matrixFilter: null,
  dateFilter: null,
})

export const reducers = {
  [asyncActions.dataActionName]: (state, { payload: { items } }) => state.merge({ items }),
  [SET_MATRIX_FILTER]: (state, { payload }) => state.merge(payload),
  [SET_DATE_FILTER]: (state, { payload }) => state.merge(payload),
  [RESET_RECORDS]: () => initialState,
}

export default handleActions(reducers, initialState);
