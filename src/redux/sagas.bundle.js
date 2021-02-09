import { all } from 'redux-saga/effects';
import { getReports } from 'rdx/newRedux/sagas';
import { recordSagas } from './records/sagas';
import { summarySagas } from './summary/sagas';

export default function* sagas() {
  yield all([...recordSagas, ...summarySagas, getReports()]);
}
