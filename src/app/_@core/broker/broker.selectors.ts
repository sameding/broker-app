import { createSelector } from '@ngrx/store';

import { MODULE_NAME } from './broker.action.types';
import { State } from './broker.state';

interface AppState {
    [moduleName: string]: State;
}

const selectModule = (state: AppState): State => state[MODULE_NAME];

export const BROKER_SELECTORS = {
    items: createSelector(
        selectModule,
        (state: State) => {
            return state.items
        }
    ),

    item: createSelector(
        selectModule,
        (state: State, id: string) => state.items.find[id]
    ),

    token: createSelector(
        selectModule,
        (state: State) => state.token
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
