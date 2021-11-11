import { Sale } from '../../types/Api';

export type SaleReducerState = {
    sales: Sale[],
    shouldFetchSales?: boolean,
}

type SaleAction =
    | { type: 'SET_SALES', payload: Sale[] }
    | { type: 'FETCH_SALES' }

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
        default:
            return {
                ...state
            }
    }
}
