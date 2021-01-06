import { createSelector } from 'reselect'

const dialogsDataSelector = (state) => state.dialogs

export const resetPasswordSelector = createSelector(
  dialogsDataSelector,
  (payload) => ({
    resetPasswordOpen: payload.get('resetPasswordOpen'),
  }),
);


export const fetchingDataSelector = createSelector(
  dialogsDataSelector,
  (payload) => ({
    fetchingDataOpen: payload.get('fetchingDataOpen'),
  }),
);

export const genericErrorSelector = createSelector(
  dialogsDataSelector,
  (payload) => ({
    genericErrorOpen: payload.get('genericErrorOpen'),
  }),
);
