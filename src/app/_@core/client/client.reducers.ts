import { ACTION_TYPES } from './client.action.types';
import { initialState, State } from './client.state';

export function ClientReducers(state: State = initialState, action): State {
    switch (action.type) {
        case ACTION_TYPES.FETCH_MANY_CLIENTS:
        case ACTION_TYPES.FETCH_ONE_CLIENT:
        case ACTION_TYPES.CREATE_ONE_CLIENT:
        case ACTION_TYPES.UPDATE_ONE_CLIENT:
        case ACTION_TYPES.DELETE_ONE_CLIENT:
            return {
                ...state,
                status: {
                    ...state.status,
                    fetching: true
                }
            };

        case ACTION_TYPES.SAVE_MANY_CLIENTS:
            return {
                ...state,
                items: action.items,
                status: {
                    ...state.status,
                    fetching: false,
                    fetched: true,
                }
            };

        case ACTION_TYPES.SAVE_ONE_CLIENT:
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item
                ],
                status: {
                    ...state.status,
                    fetching: false,
                    fetched: false
                }
            };
        case ACTION_TYPES.DELETE_SAVE_ONE_CLIENT:
          return {
            ...state,
            items: [...state.items].filter(elt => elt && elt.id !== action.item.id),
            status: {
                ...state.status,
                fetched: true,
                fetching: false,
                failed: false,
                statusCode: null,
                errors: []
            }
        };
        case ACTION_TYPES.FETCH_FAILED_CLIENT:
            const { error } = action;
            return {
                ...state,
                status: {
                    fetching: false,
                    fetched: true,
                    failed: true,
                    statusCode: error.status,
                    errors: error.body && error.body.errors || []
                }
            };

        default:
            return state;
    }
};
