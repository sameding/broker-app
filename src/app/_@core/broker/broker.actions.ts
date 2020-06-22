import { Action } from '@ngrx/store';

import { ACTION_TYPES } from './broker.action.types';
import { ErrorResponse, Broker, BrokerLoginObject } from '_@api/broker';


export class LoginBroker implements Action {
    readonly type = ACTION_TYPES.LOG_IN_BROKER;
    constructor(
        public item: BrokerLoginObject
    ) {}
}

export class SaveOneBroker implements Action {
    readonly type = ACTION_TYPES.SAVE_ONE_BROKER;
    constructor(
        public item: any
    ) {}
}

export class CreateOneBroker implements Action {
  readonly type = ACTION_TYPES.CREATE_ONE_BROKER;
  constructor(
      public item: Broker
  ) {}
}

export class LogOutBroker implements Action {
  readonly type = ACTION_TYPES.LOG_OUT_BROKER
  constructor(){ }
}

export class FetchFailedBroker implements Action {
    readonly type = ACTION_TYPES.FETCH_FAILED_BROKER;
    constructor(
        public error: ErrorResponse
    ) {}
}
