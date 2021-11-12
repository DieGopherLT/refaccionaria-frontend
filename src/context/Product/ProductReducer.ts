import { Category, GenericResponse, Product } from '../../types/Api';

export type ProductReducerState = {
    products: Product[],
    shouldFetchProducts?: boolean,
    editingProduct: Product | null;
    brands: string[],
    shouldFetchBrands?: boolean,
    categories: Category[]
    response: GenericResponse | null,
}

type ProductAction =
    | { type: 'SET_PRODUCTS', payload: Product[] }
    | { type: 'FETCH_PRODUCTS' }
    | { type: 'SET_BRANDS', payload: string[] }
    | { type: 'FETCH_BRANDS' }
    | { type: 'SET_CATEGORIES', payload: Category[] }
    | { type: 'SET_EDITING_PRODUCT', payload: Product | null }
    | { type: 'UPDATE_PRODUCT', payload: Product }
    | { type: 'DELETE_PRODUCT', payload: number }

export default function reducer(state: ProductReducerState, action: ProductAction): ProductReducerState {
    switch(action.type) {
        case 'SET_PRODUCTS':
            return {
                ...state,
                products: action.payload,
                shouldFetchProducts: false
            }
        case 'FETCH_PRODUCTS':
            return {
                ...state,
                shouldFetchProducts: true
            }
        case 'SET_BRANDS':
            return {
                ...state,
                brands: action.payload,
                shouldFetchBrands: false
            }
        case 'FETCH_BRANDS':
            return {
                ...state,
                shouldFetchBrands: true
            }
        case 'SET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'SET_EDITING_PRODUCT':
            return {
                ...state,
                editingProduct: action.payload
            }
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product => product.product_id === action.payload.product_id ? action.payload : product)
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
