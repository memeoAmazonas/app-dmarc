import { createSelector } from 'reselect'


const userDataSelector = (state) => state.user

export const selectLanguage = createSelector(
  userDataSelector,
  (payload) => payload.get('language'),
)