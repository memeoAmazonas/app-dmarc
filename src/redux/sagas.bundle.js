import { all } from 'redux-saga/effects';
import { getReports, getForensic, getHistogram } from 'rdx/newRedux/sagas/reports';
import { recordSagas } from './records/sagas';
import { summarySagas } from './summary/sagas';

export default function* sagas() {
  yield all([
    ...recordSagas,
    ...summarySagas,
    getReports(),
    getForensic(),
    getHistogram(),
  ]);
}
