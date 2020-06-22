import { ErrorObject, Broker } from '_@api/broker';

interface Status {
    fetching: boolean;
    fetched: boolean;
    failed: boolean;
    statusCode: number;
    errors: ErrorObject[];
}
const initialStatus = {
    fetching: false,
    fetched: false,
    failed: false,
    statusCode: null,
    errors: []
};

export interface State {
    items: Broker[];
    token: string
    status: Status;
};
export const initialState = {
    items: [],
    token: null,
    status: initialStatus
};
