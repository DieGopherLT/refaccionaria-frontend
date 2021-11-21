import { Client } from '../../types/Api';

export interface ClientReducerState {
    clients: Client[];
    shouldFetchClients?: boolean;
}

type ClientAction =
    | { type: 'SET_CLIENTS', payload: Client[] }
    | { type: 'FETCH_CLIENTS' }

export default function reducer(state: ClientReducerState, action: ClientAction): ClientReducerState {
    switch(action.type) {
        case 'SET_CLIENTS':
            return {
                ...state,
                clients: action.payload,
                shouldFetchClients: false,
            }
        case 'FETCH_CLIENTS':
            return {
                ...state,
                shouldFetchClients: true
            }
        default:
            return state;
    }
}
