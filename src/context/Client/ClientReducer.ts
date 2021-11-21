import { Client } from '../../types/Api';

export interface ClientReducerState {
    clients: Client[];
    shouldFetchClients?: boolean;
    editingClient: Client | null;
}

type ClientAction =
    | { type: 'SET_CLIENTS', payload: Client[] }
    | { type: 'FETCH_CLIENTS' }
    | { type: 'DELETE_CLIENT', payload: number }
    | { type: 'SET_EDITING_CLIENT', payload: Client | null }
    | { type: 'UPDATE_CLIENT', payload: Client }

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
        case 'SET_EDITING_CLIENT':
            return {
                ...state,
                editingClient: action.payload
            }
        case 'UPDATE_CLIENT':
            return {
                ...state,
                clients: state.clients.map(client => client.client_id === action.payload.client_id ? action.payload : client),
            }
        case 'DELETE_CLIENT':
            return {
                ...state,
                clients: state.clients.filter(client => client.client_id !== action.payload)
            }
        default:
            return state;
    }
}
