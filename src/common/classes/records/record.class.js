import _ from 'lodash';
import moment from 'moment';

import { STATUS } from 'common/constants';

export class Record {
  static getRecordsValue = (records: Record[] = []): number => {
    let count = 0
    if (_.isEmpty(records)) return count;

    records.forEach((rec) => {
      count += rec.recordValue
    });
    return count;
  }

  constructor(
    domain,
    sourceBaseDomain,
    sourceIp,
    recordValue,
    RecordAuthResultsSpfResult,
    RecordRowPolicyEvaluatedSpf,
    RecordAuthResultsDkimResult,
    RecordRowPolicyEvaluatedDkim,
    RecordRowAlignmentDmarc,
    RecordRowAlignmentSpf,
    RecordRowAlignmentDkim,
    ReportMetadataDateRangeBegin,
    ReportMetadataDateRangeEnd,
    RecordAuthResultsDkmiDomain,
    RecordIdentifiersEnvelopeFrom,
    RecordAuthResultsSpfDomain,
    RecordIdentifiersHeadersFrom,
  ) {
    this.domain = domain;
    this.sourceBaseDomain = sourceBaseDomain;
    this.sourceIp = sourceIp;
    this.recordValue = recordValue;
    this.RecordAuthResultsSpfResult = RecordAuthResultsSpfResult;
    this.RecordRowPolicyEvaluatedSpf = RecordRowPolicyEvaluatedSpf;
    this.RecordAuthResultsDkimResult = RecordAuthResultsDkimResult;
    this.RecordRowPolicyEvaluatedDkim = RecordRowPolicyEvaluatedDkim;
    this.RecordRowAlignmentDmarc = RecordRowAlignmentDmarc;
    this.RecordRowAlignmentSpf = RecordRowAlignmentSpf;
    this.RecordRowAlignmentDkim = RecordRowAlignmentDkim;
    this.RecordAuthResultsDkmiDomain = RecordAuthResultsDkmiDomain;
    this.RecordIdentifiersEnvelopeFrom = RecordIdentifiersEnvelopeFrom;
    this.RecordAuthResultsSpfDomain = RecordAuthResultsSpfDomain;
    this.RecordIdentifiersHeadersFrom = RecordIdentifiersHeadersFrom;


    this.startDate = moment(ReportMetadataDateRangeBegin);
    this.endDate = moment(ReportMetadataDateRangeEnd);
  }

  // PC10
  get authorized(): boolean {
    return STATUS.pass.includes(this.RecordAuthResultsSpfResult)
      && STATUS.pass.includes(this.RecordRowPolicyEvaluatedSpf);
  }

  // PC13
  get authenticated(): boolean {
    return STATUS.pass.includes(this.RecordAuthResultsDkimResult)
      && STATUS.pass.includes(this.RecordRowPolicyEvaluatedDkim);
  }

  // PC16
  get dmarc(): boolean {
    return this.authenticated || this.authorized;
  }

  // PC20
  get spfAlignedAndAuthResult(): boolean {
    // Number of messages
    return STATUS.pass.includes(this.RecordRowAlignmentSpf)
      && STATUS.pass.includes(this.RecordAuthResultsSpfResult);
  }

  // PC21
  get spfAlignedNotAuthResult(): boolean {
    return STATUS.pass.includes(this.RecordRowAlignmentSpf)
      && STATUS.fail.includes(this.RecordAuthResultsSpfResult);
  }

  // PC22
  get spfNotAligned(): boolean {
    return STATUS.fail.includes(this.RecordRowAlignmentSpf)
  }

  // PC23
  get dkimAlignedAndAuthResult(): boolean {
    // Number of messages
    return STATUS.pass.includes(this.RecordRowAlignmentDkim)
      && STATUS.pass.includes(this.RecordAuthResultsDkimResult);
  }

  // PC24
  get dkimAlignedNotAuthResult(): boolean {
    return STATUS.pass.includes(this.RecordRowAlignmentDkim)
      && STATUS.fail.includes(this.RecordAuthResultsDkimResult);
  }

  // PC25
  get dkimNotAligned(): boolean {
    return STATUS.fail.includes(this.RecordRowAlignmentDkim)
  }

  // PC26 -> PC28
  get authSpfDkimPass(): boolean {
    return STATUS.pass.includes(this.RecordAuthResultsDkimResult)
    && STATUS.pass.includes(this.RecordAuthResultsSpfResult)
  }

  // PC27 -> PC29
  get authSpfDkimFail(): boolean {
    // Number of messages
    return STATUS.fail.includes(this.RecordAuthResultsDkimResult)
    && STATUS.fail.includes(this.RecordAuthResultsSpfResult)
  }

  compareStatus(dkimStatus: string[], spfStatus: string[]): boolean {
    return dkimStatus.includes(this.RecordAuthResultsDkimResult)
    && spfStatus.includes(this.RecordAuthResultsSpfResult);
  }

  // OLD METHODS <- SpfDkim Detail might need a refactor

  get spfAligned(): boolean {
    return STATUS.pass.includes(this.RecordRowPolicyEvaluatedSpf);
  }

  get dkimAligned(): boolean {
    return STATUS.pass.includes(this.RecordRowPolicyEvaluatedDkim);
  }

  get spfDkimAligned(): boolean {
    return this.spfAligned && this.dkimAligned;
  }

  get spfPassed(): boolean {
    return STATUS.pass.includes(this.RecordAuthResultsSpfResult);
  }

  get dkimPassed(): boolean {
    return STATUS.pass.includes(this.RecordAuthResultsDkimResult);
  }

  get dmarcAligned(): boolean {
    //return STATUS.pass.includes(this.RecordRowAlignmentDmarc);
    return (STATUS.pass.includes(this.RecordAuthResultsSpfResult) &&
    STATUS.pass.includes(this.RecordRowPolicyEvaluatedSpf)) || 
    (STATUS.pass.includes(this.RecordAuthResultsDkimResult) &&
    STATUS.pass.includes(this.RecordRowPolicyEvaluatedDkim));
  }
}
