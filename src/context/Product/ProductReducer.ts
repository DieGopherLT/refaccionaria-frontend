import { GenericResponse, Product } from '../../types/Api';

export type ProductReducerState = {
    products: Product[],
    response: GenericResponse | null;
}

type ProductAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }

export default function reducer(state: ProductReducerState, action: ProductAction): ProductReducerState {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}
