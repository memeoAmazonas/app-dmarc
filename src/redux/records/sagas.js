import {
  put, fork, takeLatest, call,
} from 'redux-saga/effects'

import { fetchingData, displayError } from 'rdx/dialogs/actions'

import { asyncActions } from './actions';
import { parseResponse, buildRequestFromPath } from './parsers';
import { getCustom } from './api';


export function* fetchCustomData(action) {
  let allItems = []
  let { requestObject } = action.payload;
  let fetchMore = true;

  yield put(fetchingData(true))

  // Since the backend does not compute or creates summaries for certain
  // views of the data, they are using chunks to send us all the recors
  // for one request, which then needs to be processed in the frontend
  try {
    while (fetchMore) {
      const result = yield call(getCustom, requestObject);
      const { items, more } = parseResponse(result);
      allItems = [...allItems, ...items]
      fetchMore = Boolean(more)
      requestObject = buildRequestFromPath(more)
    }
  } catch (e) {
    yield put(displayError(true))
  } finally {
    yield put(fetchingData(false))
  }

  yield put(asyncActions.dataAction({ items: allItems }));
}

function* watchGetCustom() {
  yield takeLatest(asyncActions.loadActionName, fetchCustomData)
}


export const recordSagas = [fork(watchGetCustom)]
