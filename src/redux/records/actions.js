import { createAction } from 'redux-actions';

import { AsyncActionHelper } from 'common/classes/actions/action-helpers.class';


export const RESET_RECORDS = 'app/dmarc/REST_RECORDS';
export const SET_MATRIX_FILTER = 'app/dmarc/SET_MATRIX_FILTER';
export const SET_DATE_FILTER = 'app/dmarc/SET_DATE_FILTER';

export const resetRecords = createAction(RESET_RECORDS);
export const setMatrixFilter = createAction(
  SET_MATRIX_FILTER, (filter) => ({ matrixFilter: filter })
);
export const setDateFilter = createAction(
  SET_DATE_FILTER, (filter) => ({ dateFilter: filter })
);
export const actions = {
  setDateFilter,
  setMatrixFilter,
  resetRecords,
}

export const asyncActions = new AsyncActionHelper('app/dmarc/RECORDS');
