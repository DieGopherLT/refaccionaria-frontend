import { GenericResponse, Product, Provider } from '../../types/Api';

export type DataReducerState = {
    products: Product[],
    providers: Provider[];
    editingProvider: Provider | null;
    response: GenericResponse | null;
}

type DataAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }
    | { type: 'SET_PROVIDERS', payload: Provider[] }
    | { type: 'SET_EDITING_PROVIDER', payload: Provider | null }
    | { type: 'UPDATE_PROVIDER', payload: Provider }
    | { type: 'DELETE_PROVIDER', payload: { id: number, response: GenericResponse } }
    | { type: 'SET_RESPONSE', payload: GenericResponse }

export default function reducer(state: DataReducerState, action: DataAction): DataReducerState {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
        case 'SET_PROVIDERS':
            return {
                ...state,
                providers: action.payload
            }
        case 'SET_EDITING_PROVIDER':
            return {
                ...state,
                editingProvider: action.payload
            }
        case 'UPDATE_PROVIDER':
            return {
                ...state,
                providers: state.providers.map(provider => provider.provider_id === action.payload.provider_id ? action.payload : provider)
            }
        case 'DELETE_PROVIDER':
            return {
                ...state,
                response: action.payload.response,
                providers: state.providers.filter(provider => provider.provider_id !== action.payload.id)
            }
        default:
            return {
                ...state
            }
    }
}
