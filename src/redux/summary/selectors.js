import _ from 'lodash';

import { createSelector } from 'reselect'
import { recordItemsSelector } from 'rdx/records/selectors'
import { Summary } from 'common/classes/summary/summary.class';
import { SummaryRecordsAdapter } from 'common/classes/summary/records.adapter.class';
import { computeTotalMessages } from './parsers'
import { DEFAULT_DISPLAY } from 'common/constants'


const summaryDataSelector = (state) => state.summary

export const displaySelector = createSelector(
  summaryDataSelector, (payload) => payload.get('display'),
)

export const domainsSelector = createSelector(
  summaryDataSelector,
  (payload) => payload.get('domains'),
)

export const currentDomainSelector = createSelector(
  summaryDataSelector,
  (payload) => payload.get('domain'),
)

/**
 * Select the domains based on the display selection
 */
export const dashboardViewSelector = createSelector(
  displaySelector,
  domainsSelector,
  (display, domains) => {
    const selectedDomains = {};
    Object.keys(domains).forEach((domain) => {
      selectedDomains[domain] = domains[domain][display] || new Summary()
    })
    const totalDomainsSummary = computeTotalMessages(Object.values(selectedDomains))
    return { display, domains: selectedDomains, total: totalDomainsSummary };
  }
);

export const domainDetailsFromPrecalculatedSelector = createSelector(
  displaySelector,
  domainsSelector,
  currentDomainSelector,
  (display, domains, selectedDomain) => {
    if (selectedDomain) {
      return _.get(domains, selectedDomain, {})[display]
    }
    return {};
  }
)

export const domainDetailsFromRecordsSelector = createSelector(
  recordItemsSelector,
  currentDomainSelector,
  (records, selectedDomain) => {
    if (selectedDomain && !_.isEmpty(records)) {
      const adapter = new SummaryRecordsAdapter(records);
      return adapter;
    }
    return {};
  }
)

// When display is -1 load the summary from the records
// this happens when the user selects a custom range from
// the date filter
export const selectIsCustomFilterActive = createSelector(
  displaySelector, (display) => display === -1
)

export const domainDetailsSelector = createSelector(
  selectIsCustomFilterActive,
  domainDetailsFromPrecalculatedSelector,
  domainDetailsFromRecordsSelector,
  (customFilterActive, fromPrecalculated, fromRecords) => {

    if (customFilterActive) {
      return fromRecords
    }
    return fromPrecalculated
  }
)


export const showFilterResetSelector = createSelector(
  displaySelector,
  recordItemsSelector,
  (display, records) =>  display !== DEFAULT_DISPLAY || !_.isEmpty(records)
)
