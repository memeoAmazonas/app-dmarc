import { put, call, takeLatest } from 'redux-saga/effects';
import apiCall from 'rdx/newRedux/api/api';
import { GET_REPORT } from 'rdx/newRedux/types';

function* callToApi(response) {
  const { payload } = response;
  const {
    url, method, success, error,
    send, params,
  } = payload;
  try {
    const result = yield call(apiCall, url, method, params || null, send || null, null);
    yield put({
      type: success,
      payload: result.data,
    });
  } catch (err) {
    yield put({
      type: error,
      payload: err,
    });
  }
}
export function* getReports() {
  yield takeLatest(GET_REPORT, callToApi);
}
