export type SaleReducerState = {

}

type SaleAction =
    | { type: '' }

export default function reducer(state: SaleReducerState, action: SaleAction): SaleReducerState {
    switch(action.type) {
        default:
            return {
                ...state
            }
    }
}
