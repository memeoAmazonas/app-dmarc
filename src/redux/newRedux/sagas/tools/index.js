import { takeLatest } from 'redux-saga/effects';
import { callToApi } from 'rdx/newRedux/sagas';
import { GET_TOOLS } from 'rdx/newRedux/types';

export function* getTools() {
  yield takeLatest(GET_TOOLS, callToApi)
}
