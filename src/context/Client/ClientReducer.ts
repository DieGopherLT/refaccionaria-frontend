export interface ClientReducerState {

}

type ClientAction =
    | { type: '' }

export default function reducer(state: ClientReducerState, action: ClientAction): ClientReducerState {
    switch(action.type) {
        default:
            return state;
    }
}
