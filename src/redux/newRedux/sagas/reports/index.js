import { takeLatest } from 'redux-saga/effects';
import { GET_HISTOGRAM, GET_REPORT, GET_REPORT_FORENSIC } from 'rdx/newRedux/types';
import { callToApi } from 'rdx/newRedux/sagas';

export function* getReports() {
  yield takeLatest(GET_REPORT, callToApi);
}

export function* getForensic() {
  yield takeLatest(GET_REPORT_FORENSIC, callToApi)
}
export function* getHistogram() {
  yield takeLatest(GET_HISTOGRAM, callToApi);
}
