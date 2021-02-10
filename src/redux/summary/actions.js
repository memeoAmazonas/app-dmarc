import { createAction } from 'redux-actions';

import { AsyncActionHelper } from 'common/classes/actions/action-helpers.class';


const SELECT_DOMAIN = 'app/dmarc/SELECT_DOMAIN';
const SELECT_DISPLAY = 'app/dmarc/SELECT_DISPLAY';

export const constants = {
  SELECT_DOMAIN,
  SELECT_DISPLAY,
}

export const selectDomain = createAction(SELECT_DOMAIN, (domain) => ({ domain }));
export const selectDisplay = createAction(SELECT_DISPLAY, (display) => ({ display }))
export const actions = {
  selectDomain,
  selectDisplay,
}

export const asyncActions = new AsyncActionHelper('app/dmarc/PRECALCULATED');
