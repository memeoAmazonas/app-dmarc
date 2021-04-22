import { combineReducers } from 'redux';
import { USER_LOGOUT } from './user/actions';

import records from './records/reducers';
import dialogs from './dialogs/reducers';
import summary from './summary/reducers';
import user from './user/reducers';
import { forensic, histogram, report360 } from './newRedux/reducer/reports';

export const appReducers = combineReducers({
  records,
  dialogs,
  summary,
  user,
  forensic,
  histogram,
  report360,
});

/*
 * When the action type is equal to USER_LOGOUT
 * reset the application state. In case another
 * user with new data logs in.
 */
export default (state, action) => {
  let nextState = state;
  if (action.type === USER_LOGOUT) {
    nextState = undefined;
  }

  return appReducers(nextState, action);
}
