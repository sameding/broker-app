import { createSelector } from '@ngrx/store';

import { MODULE_NAME } from './client.action.types';
import { State } from './client.state';

interface AppState {
    [moduleName: string]: State;
}

const selectModule = (state: AppState): State => state[MODULE_NAME];

export const CLIENT_SELECTORS = {
    items: createSelector(
        selectModule,
        (state: State) => {
            console.log('state:', state)
            return state.items
        }
    ),

    item: createSelector(
        selectModule,
        (state: State, id: number) => state.items.find[id]
    ),

    status: createSelector(
        selectModule,
        (state: State) => state.status
    ),

    fetched: createSelector(
      selectModule,
      (state: State) => state.status.fetched
    ),

  fetching: createSelector(
      selectModule,
      (state: State) => state.status.fetching
  ),

  failed: createSelector(
      selectModule,
      (state: State) => state.status.failed
  ),

  statusCode: createSelector(
      selectModule,
      (state: State) => state.status.statusCode
  ),

  errors: createSelector(
      selectModule,
      (state: State) => state.status.errors
  ),
};
