import {
  put, fork, takeLatest, call,
} from 'redux-saga/effects'

import { displayError } from 'rdx/dialogs/actions'
import { asyncActions } from 'rdx/summary/actions';
import { parsePrecalculatedResponse } from './parsers';
import { summaryApi } from './api';


export function* loadPrecalculated(action) {
  let result;
  const { customerId } = action.payload;

  try {
    result = yield call(summaryApi.getPrecalculated, customerId);
    result = parsePrecalculatedResponse(result);
  } catch (e) {
    yield put(displayError(true))
  }

  yield put(asyncActions.dataAction(result))
}

function* watchLoadPrecalculated() {
  yield takeLatest(asyncActions.loadActionName, loadPrecalculated)
}


export const summarySagas = [
  fork(watchLoadPrecalculated),
];
