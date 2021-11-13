import { Delivery } from '../../types/Api';

export type DeliveryReducerState = {
    deliveries: Delivery[];
    shouldFetchDeliveries?: boolean;
}

type DeliveryAction =
    | { type: 'SET_DELIVERIES', payload: Delivery[] }
    | { type: 'FETCH_DELIVERIES' }

export default function reducer(state: DeliveryReducerState, action: DeliveryAction): DeliveryReducerState {
    switch(action.type) {
        case 'SET_DELIVERIES':
            return {
                ...state,
                deliveries: action.payload,
                shouldFetchDeliveries: false,
            }
        case 'FETCH_DELIVERIES':
            return {
                ...state,
                shouldFetchDeliveries: true,
            }
        default:
            return state;
    }
}
