import _ from 'lodash';

import { Check } from './check.class';
import { Record } from './record.class';

const orderBy = (transformed) => {
  const result = [];
  let i = 0;
  _.forEach(transformed, (da) => {
    const key = Object.keys(da);
    result.push({
      value: da[key[0]][0].recordsMessages,
      ip: key[0],
      position: i,
    })
    // eslint-disable-next-line no-plusplus
    i++;
  });
  result.sort((x, y) => (x.value > y.value ? -1 : 1))
  const response = [];
  _.forEach(result, (item) => {
    response.push(transformed[item.position]);
  });
  return response;
}
// TODO: Maybe consolidate all this checks into the checks object?
class SpfDkimDetail {
  constructor(total, records) {
    this.total = total;
    this.recordsMessages = Record.getRecordsValue(records);
    this.records = records;
    this.ips = Object.keys(_.groupBy(records, 'sourceIp')).length;

    this.spfAlignmentPassPerc = Check.checkFromRecords(records, 'spfAligned').pass / this.total;
    this.dkimAlignmentPassPerc = Check.checkFromRecords(records, 'dkimAligned').pass / this.total;
    this.dmarcAlignmentPassPerc = Check.checkFromRecords(records, 'dmarcAligned').pass / this.total;
    this.spfPassPerc = Check.checkFromRecords(records, 'spfPassed').pass / this.total;
    this.dkimPassPerc = Check.checkFromRecords(records, 'dkimPassed').pass / this.total;
  }
}

export class SpfDkimSummary {
  constructor(identifier, records) {
    this.identifier = identifier;
    this.records = records;
    this.totalMessages = Record.getRecordsValue(this.records);

    this.detail = new SpfDkimDetail(this.totalMessages, this.records);
  }


  /*
   * Returns the summary for the records by ip group
   */
  recordsSummaryByIp(): Array<{ [key: string]: Array<SpfDkimDetail> }> {
    const transformed = [];
    const grouped = _.groupBy(this.records, 'sourceIp');
    _.forEach(grouped, (records, ip) => {
      transformed.push({ [ip]: [new SpfDkimDetail(Record.getRecordsValue(records), records)] });
    })
    return orderBy(transformed);
  }

  /*
   * Return records by combinations
   */
  recordsByCombinations(): Array<{ [key: string]: Array<SpfDkimDetail> }> {
    // Group by all the different combinations off
    // Combinations are pesent or not present
    const results = []
    this.records.forEach((record) => {
      results.push({
        source: record,
        combination: JSON.stringify({
          RecordIdentifiersEnvelopeFrom: record.RecordIdentifiersEnvelopeFrom,
          RecordIdentifiersHeadersFrom: record.RecordIdentifiersHeadersFrom,
          RecordAuthResultsDkmiDomain: record.RecordAuthResultsDkmiDomain,
        }),
      })
    });


    const groups = _.groupBy(results, 'combination');

    const transformed = []
    _.forEach(groups, (result) => {
      const records = result.map((res) => res.source);
      const ip = records.length > 0 ? records[0].sourceIp : '';
      transformed.push({ [ip]: [new SpfDkimDetail(this.totalMessages, records)] })
    });
    return orderBy(transformed);
  }
}
