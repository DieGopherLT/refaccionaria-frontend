import { Sale } from '../../types/Api';

export type SaleReducerState = {
    sales: Sale[],
    shouldFetchSales?: boolean,
    editingSale: Sale | null;
}

type SaleAction =
    | { type: 'SET_SALES', payload: Sale[] }
    | { type: 'FETCH_SALES' }
    | { type: 'SET_EDITING_SALE', payload: Sale | null }
    | { type: 'DELETE_SALE', payload: number }

export default function reducer(state: SaleReducerState, action: SaleAction): SaleReducerState {
    switch(action.type) {
        case 'SET_SALES':
            return {
                ...state,
                sales: action.payload,
                shouldFetchSales: false
            }
        case 'FETCH_SALES':
            return {
                ...state,
                shouldFetchSales: true
            }
        case 'SET_EDITING_SALE':
            return {
                ...state,
                editingSale: action.payload
            }
        case 'DELETE_SALE':
            return {
                ...state,
                sales: state.sales.filter(sale => sale.sale_id !== action.payload)
            }
        default:
            return {
                ...state
            }
    }
}
