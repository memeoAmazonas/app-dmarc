import { createSelector } from 'reselect'

const recordsDataSelector = (state) => state.records

// Return the entire app state
export const recordItemsSelector = createSelector(
  recordsDataSelector,
  (recordsState) => recordsState.get('items'),
);

export const matrixFilterSelector = createSelector(
  recordsDataSelector,
  (recordState) => recordState.get('matrixFilter')
)

export const dateFilterSelector = createSelector(
  recordsDataSelector,
  (recordState) => recordState.get('dateFilter')
)
