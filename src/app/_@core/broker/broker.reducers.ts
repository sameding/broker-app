import { ACTION_TYPES } from './broker.action.types';
import { initialState, State } from './broker.state';

export function BrokerReducers(state: State = initialState, action): State {
    switch (action.type) {
        case ACTION_TYPES.CREATE_ONE_BROKER:
        case ACTION_TYPES.LOG_IN_BROKER:
            localStorage.clear()
            return {
                ...state,
                status: {
                    ...state.status,
                    fetching: true
                }
            };

        case ACTION_TYPES.SAVE_ONE_BROKER:
            localStorage.setItem('user', JSON.stringify(action.item))
            return {
                ...state,
                items: [
                    ...state.items,
                    action.item.user
                ],
                token: action.item.access_token,
                status: {
                    ...state.status,
                    fetching: false,
                    fetched: true
                }
            };
        case ACTION_TYPES.LOG_OUT_BROKER:
            localStorage.clear();
            return {
              ...state,
              items: [],
              token: null,
            };

        case ACTION_TYPES.FETCH_FAILED_BROKER:
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
