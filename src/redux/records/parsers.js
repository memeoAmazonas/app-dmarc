import { Record } from 'common/classes/records/record.class';

// 0 No matrix value
// 1  - Valor de la Matriz  PASS    PASS
// 2  - Valor de la Matriz  PASS    NEUTRAL
// 3  - Valor de la Matriz  PASS    FAIL
// 4  - Valor de la Matriz  NEUTRAL PASS
// 5  - Valor de la Matriz  NEUTRAL NEUTRAL
// 6  - Valor de la Matriz  NEUTRAL FAIL
// 7  - Valor de la Matriz  FAIL    PASS
// 8  - Valor de la Matriz  FAIL    NEUTRAL
// 9  - Valor de la Matriz  FAIL    FAIL
export const getMatrixPositionForApi = (attr: string): number => {
  const mapping = {
    passpass: 1,
    passneutral: 2,
    passfail: 3,
    neutralpass: 4,
    neutralneutral: 5,
    neutralfail: 6,
    failpass: 7,
    failneutral: 8,
    failfail: 9,
  }
  return mapping[attr]
}

export const buildRequestFromPath = (path?: string) => {
  if (!path) return {}

  const search = new URLSearchParams(`?${path}`)
  return {
    id: search.get('id'),
    domain: search.get('domain'),
    table: search.get('table'),
    startDate: search.get('dateB'),
    endDate: search.get('dateA'),
    matrix: search.get('matrix'),
    type: search.get('type'),
    chunk: search.get('chunk'),
  }
}


export const parseResponse = (response) => {
  const { data: { items, more } } = response;

  const records = items.map((dat) => (
    new Record(
      dat.C2, // Domain
      dat.C29, // RecordRowSourceBaseDomain
      dat.C31, // RecordRowSourceIP
      +(dat.C22), // RecordRowCount
      dat.C13, // RecordAuthResultsSpfResult
      dat.C28, // RecordRowPolicyEvaluatedSpf
      dat.C10, // RecordAuthResultsDkimResult
      dat.C24, // RecordRowPolicyEvaluatedDkim
      dat.C20.toString(), // RecordRowAlignmentDmarc
      dat.C21.toString(), // RecordRowAlignmentSpf
      dat.C19.toString(), // RecordRowAlignmentDkim
      dat.C33, // ReportMetadataDateRangeBegin
      dat.C34, // ReportMetadataDateRangeEnd
      dat.C11, // RecordAuthResultsDkmiDomain
      dat.C16, // RecordIdentifiersEnvelopeFrom
      dat.C14, // RecordAuthResultsSpfDomain
      dat.C18, // RecordIdentifiersHeadersFrom
    )
  ));

  return {
    items: records,
    more,
  }
}
