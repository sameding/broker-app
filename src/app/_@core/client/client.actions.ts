import { Action } from '@ngrx/store';

import { ACTION_TYPES } from './client.action.types';
import { ErrorResponse, Client, ClientList } from '_@api/broker';

export class FetchManyClients implements Action {
    readonly type = ACTION_TYPES.FETCH_MANY_CLIENTS;
    constructor(
      public FirstName?: string,
      public LastName?: string,
  ) { }
}

export class SaveManyClients implements Action {
    readonly type = ACTION_TYPES.SAVE_MANY_CLIENTS;
    constructor(
        public items: ClientList
    ) {}
}

export class FetchOneClient implements Action {
    readonly type = ACTION_TYPES.FETCH_ONE_CLIENT;
    constructor(
        public id: number
    ) {}
}

export class SaveOneClient implements Action {
    readonly type = ACTION_TYPES.SAVE_ONE_CLIENT;
    constructor(
        public item: Client
    ) {}
}

export class CreateOneClient implements Action {
  readonly type = ACTION_TYPES.CREATE_ONE_CLIENT;
  constructor(
      public item: Client
  ) {}
}

export class UpdateOneClient implements Action {
  readonly type = ACTION_TYPES.UPDATE_ONE_CLIENT;
  constructor(
      public item: Client
  ) {}
}

export class DeleteOneClient implements Action {
  readonly type = ACTION_TYPES.DELETE_ONE_CLIENT;
  constructor(
      public id: number
  ) {}
}

export class DeleteSaveOneClient implements Action {
  readonly type = ACTION_TYPES.DELETE_SAVE_ONE_CLIENT;
  constructor(
    public item: any
  ) {}
}

export class FetchFailedClient implements Action {
    readonly type = ACTION_TYPES.FETCH_FAILED_CLIENT;
    constructor(
        public error: ErrorResponse
    ) {}
}
