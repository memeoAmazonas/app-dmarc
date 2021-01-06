import { createAction } from 'redux-actions';

export class AsyncActionHelper {
  constructor(prefix: string) {
    this.prefix = prefix;
    this.createActions();
  }

  get loadActionName() {
    return `${this.prefix}_LOAD`;
  }

  get dataActionName() {
    return `${this.prefix}_DATA`;
  }

  get errorActionName() {
    return `${this.prefix}_ERROR`;
  }

  createActions() {
    this.loadAction = createAction(this.loadActionName, (payload) => ({ ...payload }))
    this.dataAction = createAction(this.dataActionName, (result) => (result));
    this.errorAction = createAction(this.errorActionName, (e) => (e));
  }

  toDispatchProps(actionPrefix: string) {
    return {
      [`load${actionPrefix}`]: this.loadAction,
      [`data${actionPrefix}`]: this.dataAction,
      [`error${actionPrefix}`]: this.errorAction,
    }
  }
}
