import _ from 'lodash'

import { Record } from 'common/classes/records/record.class'
import { STATUS } from 'common/constants/constants';
import { initialState } from './summary.state'


/**
 * Addapts a set of records into a summary
 */
export class SummaryRecordsAdapter {
  constructor(records: Record[]) {
    this.states = { ...initialState };
    this.records = records

    this.buildTotalMessages()
    this.buildMatrixFromRecords()
    this.buildAlignmentState()
    this.buildDmarcState()
    this.buildTotalAuthenticatedState()
  }

  get dmarc() {
    return _.get(
      this.states,
      'dmarc',
    )
  }

  get matrixState() {
    return _.get(this, 'states.matrix')
  }

  get alignment() {
    return _.get(this, 'states.alignment')
  }

  get totalMessages() {
    return _.get(this, 'states.totalMessages')
  }

  get totalAuthenticated() {
    return _.get(this, 'states.totalAuthenticated')
  }

  // TODO: Maybe refactor
  buildAlignmentState() {
    // true = Not aligned false = Aligned
    const spfNotAlignedGroup = _.groupBy(this.records, (rec) => rec.spfNotAligned)
    const spfNotAligned = Record.getRecordsValue(spfNotAlignedGroup.true) // Not Aligned
    const spfAligned = Record.getRecordsValue(spfNotAlignedGroup.false) // Aligned

    const dkimNotAlignedGroup = _.groupBy(this.records, (rec) => rec.dkimNotAligned)
    const dkimNotAligned = Record.getRecordsValue(dkimNotAlignedGroup.true) // Not Aligned
    const dkimAligned = Record.getRecordsValue(dkimNotAlignedGroup.false) // Aligned

    // From the aligned group by spfAlignedAndAuthResult
    // true = Aligned Authenticated false = Aligned Not Autheticated
    const spfAlignedGroup = _.groupBy(spfNotAlignedGroup.false,
      (rec) => rec.spfAlignedAndAuthResult)
    const spfAlignedAuth = Record.getRecordsValue(spfAlignedGroup.true)
    const spfAlignedUnAuth = Record.getRecordsValue(spfAlignedGroup.false)

    const dkimAlignedGroup = _.groupBy(dkimNotAlignedGroup.false,
      (rec) => rec.dkimAlignedAndAuthResult)
    const dkimAlignedAuth = Record.getRecordsValue(dkimAlignedGroup.true)
    const dkimAlignedUnAuth = Record.getRecordsValue(dkimAlignedGroup.false)


    this.states.alignment = {
      spf: {
        alignedAuthenticated: spfAlignedAuth,
        alignedUnauthenticated: spfAlignedUnAuth,
        notAligned: spfNotAligned,
        percentage: spfAligned / (spfAligned + spfNotAligned),
      },
      dkim: {
        alignedAuthenticated: dkimAlignedAuth,
        alignedUnauthenticated: dkimAlignedUnAuth,
        notAligned: dkimNotAligned,
        percentage: dkimAligned / (dkimAligned + dkimNotAligned),
      },
    }
  }

  buildDmarcState() {
    // TODO: Refactor this redundant code line 88
    const group = _.groupBy(this.records, (rec) => rec.dmarc)
    const pass = Record.getRecordsValue(group.true)
    const fail = Record.getRecordsValue(group.false)
    const total = pass + fail
    this.states.dmarc = {
      pass,
      fail,
      total,
      percentage: pass / total,
    }
  }

  buildTotalAuthenticatedState() {
    const group = _.groupBy(this.records, (rec) => rec.authSpfDkimPass)
    const fail = Record.getRecordsValue(group.false)
    const pass = this.totalMessages - fail
    const total = pass + fail
    this.states.totalAuthenticated = {
      pass,
      fail,
      total,
      percentage: pass / total,
    }
  }

  buildTotalMessages() {
    this.states.totalMessages = Record.getRecordsValue(this.records)
  }

  buildMatrixFromRecords() {
    const status = [STATUS.pass, STATUS.neutral, STATUS.fail];
    this.states.matrix = {};

    const getPositionValue = (dkimStatus, spfStatus) => {
      const group = _.groupBy(this.records, (rec) => rec.compareStatus(dkimStatus, spfStatus));
      return Record.getRecordsValue(group.true)
    };

    for (let i = 0; i < status.length; i += 1) {
      for (let j = 0; j < status.length; j += 1) {
        const val = getPositionValue(status[i], status[j]);
        this.states.matrix[`${status[i][0]}${status[j][0]}`] = val;
      }
    }
  }
}
