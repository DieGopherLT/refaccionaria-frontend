import { Delivery } from '../../types/Api';

export type DeliveryReducerState = {
    deliveries: Delivery[];
    shouldFetchDeliveries?: boolean;
}

type DeliveryAction =
    | { type: 'SET_DELIVERIES', payload: Delivery[] }
    | { type: 'FETCH_DELIVERIES' }
    | { type: 'DELETE_DELIVERY', payload: { productId: number, providerId: number } }

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
        case 'DELETE_DELIVERY':
            const { productId, providerId } = action.payload;
            return {
                ...state,
                deliveries: state.deliveries.filter(({ product, provider }) => product.product_id !== productId && provider.provider_id !== providerId)
            }
        default:
            return state;
    }
}
