import { GenericResponse, Product, Provider } from '../types/Api';

export type DataReducerState = {
    products: Product[],
    providers: Provider[];
    response: GenericResponse | null;
}

type DataAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }
    | { type: 'SET_PROVIDERS', payload: Provider[] }
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
        default:
            return {
                ...state
            }
    }
}
