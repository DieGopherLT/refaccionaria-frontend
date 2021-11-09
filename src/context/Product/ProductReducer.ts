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
    | { type: 'DELETE_PRODUCT', payload: number }

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
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(({ product_id }) => product_id !== action.payload)
            }
        default:
            return {
                ...state
            }
    }
}
