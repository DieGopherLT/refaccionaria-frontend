import { Category, GenericResponse, Product } from '../../types/Api';

export type ProductReducerState = {
    products: Product[],
    brands: string[],
    categories: Category[]
    response: GenericResponse | null,
}

type ProductAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }
    | { type: 'SET_BRANDS_CATEGORIES', payload: { brands: string[], categories: Category[] } }

export default function reducer(state: ProductReducerState, action: ProductAction): ProductReducerState {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
            }
        case 'SET_BRANDS_CATEGORIES':
            return {
                ...state,
                brands: action.payload.brands,
                categories: action.payload.categories
            }
        default:
            return {
                ...state
            }
    }
}
