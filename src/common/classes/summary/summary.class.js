import _ from 'lodash'
import { initialState } from './summary.state'


export class Summary {
  constructor() {
    this.states = { ...initialState };

    this._validAlignmentStates = ['spf', 'dkim']
    this._validStatusStates = ['pass', 'fail']
    this._validMessageStates = ['authorized', 'authenticated', 'dmarc', 'totalAuthenticated']
  }


  get matrixState() {
    return _.get(this.states, 'matrix')
  }

  get alignment() {
    return _.get(
      this.states,
      'alignment',
    )
  }

  get totalMessages() {
    return _.get(this.states, 'totalMessages', 0)
  }

  set totalMessages(total) {
    this.states.totalMessages = total
  }

  get totalAuthenticated() {
    return _.get(
      this.states,
      'totalAuthenticated',
    )
  }

  set totalAuthenticated(state) {
    this.states.totalAuthenticated = state
  }

  get authorized() {
    return _.get(
      this.states,
      'authorized',
    )
  }

  set authorized(state) {
    this.states.authorized = state
  }

  get authenticated() {
    return _.get(
      this.states,
      'authenticated',
    )
  }

  set authenticated(state) {
    this.states.authenticated = state
  }

  get dmarc() {
    return _.get(
      this.states,
      'dmarc',
    )
  }

  set dmarc(state) {
    this.states.dmarc = state
  }


  // eslint-disable-next-line class-methods-use-this
  validateAllowed(state: string, allowed: string[]) {
    if (!allowed.includes(state)) {
      const message = `Unsupported state ${state} - Supported ${allowed}`;
      throw new Error(message)
    }
  }

  add(summary: Summary) {
    this._validMessageStates.forEach((messageState) => {
      this[messageState] = {
        pass: this[messageState].pass + summary[messageState].pass,
        fail: this[messageState].fail + summary[messageState].fail,
      }
      this[messageState].total = (
        this[messageState].pass + this[messageState].fail);
    })

    this.totalMessages += summary.totalMessages
  }

  getPercentage(state: string, status: string) {
    this.validateAllowed(state, this._validMessageStates)
    this.validateAllowed(status, this._validStatusStates)

    const s = this.states[state]
    const percent = (s.percentage / 100) || (s[status] / s.total)
    // eslint-disable-next-line no-restricted-globals
    return isNaN(percent) ? 0 : percent;
  }

  addMatrixState(dkimStatus: string, spfStatus: string, count: number) {
    this.states.matrix = {
      ...this.states.matrix,
      [`${dkimStatus}${spfStatus}`]: count,
    }
  }

  addMessageState(state: string, pass: number, fail: number, percentage?: number) {
    this.validateAllowed(state, this._validMessageStates)

    this.states[state] = {
      pass,
      fail,
      total: pass + fail,
      percentage,
    }
  }

  addAlignmentState(
    state: string, alignedAuthenticated: number,
    alignedUnauthenticated: number, notAligned: number
  ) {
    this.validateAllowed(state, this._validAlignmentStates)
    const percentage = (alignedAuthenticated + alignedUnauthenticated) / this.totalMessages;
    this.states.alignment = {
      ...this.states.alignment,
      [state]: {
        alignedAuthenticated,
        alignedUnauthenticated,
        notAligned,
        // eslint-disable-next-line no-restricted-globals
        percentage: isNaN(percentage) ? 0 : percentage,
      },
    }
  }

  addTotalMessagesState(total: number) {
    this.states.totalMessages = total;
  }
}
