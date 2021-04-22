import { put, call } from 'redux-saga/effects';
import apiCall from 'rdx/newRedux/api/api';

export function* callToApi(response) {
  const { payload } = response;
  const {
    url, method, success, error,
    send, params, parser,
  } = payload;

  try {
    const result = yield call(apiCall, url, method, params || null, send || null, null);
    yield put({
      type: success,
      payload: parser ? parser(result.data) : result.data,
    });
  } catch (err) {
    yield put({
      type: error,
      payload: err,
    });
  }
}
