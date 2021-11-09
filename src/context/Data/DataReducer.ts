import { GenericResponse, Product, Provider } from '../../types/Api';

export type DataReducerState = {
    products: Product[],
    providers: Provider[];
    response: GenericResponse | null;
}

type DataAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }
    | { type: 'SET_PROVIDERS', payload: Provider[] }
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
