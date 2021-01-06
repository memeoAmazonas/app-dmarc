import { all } from 'redux-saga/effects';
import { recordSagas } from './records/sagas';
import { summarySagas } from './summary/sagas';

export default function* sagas() {
  yield all([...recordSagas, ...summarySagas]);
}
